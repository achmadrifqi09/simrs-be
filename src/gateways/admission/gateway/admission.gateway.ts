import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { HttpException, UseFilters, UseGuards } from '@nestjs/common';
import { WsGuard } from '../../../guards/ws-guard/ws.guard';
import { WsExceptionFilter } from '../../../filters/ws-exception/ws-exception.filter';
import { Server, Socket } from 'socket.io';
import { CounterGateway } from '../../counter/gateway/counter.gateway';
import { CounterService } from '../../../modules/master/counter/service/counter.service';
import { QueueService } from '../../../modules/queue/service/queue.service';
import { AdmissionDto } from '../dto/admission.dto';
import { SkippedAdmissionDto } from '../dto/skipped-admission.dto';
import { UpdateAdmissionDto } from '../dto/update-admission.dto';
import { Public } from '../../../decorators/public/public.decorator';
import { CallingAdmissionDto } from '../dto/calling-admission.dto';
import { RegistrationService } from 'src/modules/registration/service/registration.service';

@UseGuards(WsGuard)
@UseFilters(WsExceptionFilter)
@WebSocketGateway(Number(process.env.APP_WS_PORT) || 3002, {
  namespace: 'admission',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
})
export class AdmissionGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly counterGateway: CounterGateway,
    private readonly counterService: CounterService,
    private readonly queueService: QueueService,
    private readonly registrationService: RegistrationService,
  ) {}

  @Public()
  @SubscribeMessage('remaining-queue-code')
  async handleRemainingQueueCode(client: Socket, queueCode: string) {
    if (!queueCode) throw new WsException('Kode antrian harus disertakan');
    const remainingQueue =
      await this.queueService.findRemainingQueueCode(queueCode);
    this.server.emit(`remaining-${queueCode}`, remainingQueue);
  }

  @SubscribeMessage('next-call')
  async handleNextCallQueue(client: Socket, payload: AdmissionDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket');
      }
      const result = await this.queueService.findNextQueue(
        payload.kode_antrian,
        payload.id_ms_loket_antrian,
        payload.id_user,
      );
      this.server.emit(`current-queue-${client.id}`, {
        data: result,
      });
      if (result?.id_antrian) {
        await this.handleCallingQueue(client, {
          user_id: payload.id_user,
          id_antrian: result.id_antrian,
          id_ms_loket_antrian: payload.id_ms_loket_antrian,
        });
      }
      await this.handleRemainingQueueCode(client, payload.kode_antrian);
    } catch (err) {
      if (err instanceof WsException || err instanceof HttpException) {
        throw new WsException(err.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('pending-queue')
  async handlePendingQueue(client: Socket, id_antrian: number) {
    try {
      if (!Number(id_antrian)) throw new WsException('Id antrian tidak valid');
      const pendingQueue = await this.queueService.findPendingQueueById(
        Number(id_antrian),
      );

      this.server.emit(`pending-queue-${client.id}`, {
        data: pendingQueue,
      });
    } catch (err) {
      if (err instanceof WsException || err instanceof HttpException) {
        throw new WsException(err.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('skipped-init')
  async handleSkipInit(client: Socket, payload: SkippedAdmissionDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      const queues = await this.queueService.findSkippedQueue(
        payload.kode_antrian,
      );

      this.server.emit(`skips-${payload.kode_antrian}`, {
        data: queues,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('skip')
  async handleSkipQueue(client: Socket, payload: UpdateAdmissionDto) {
    try {
      await this.queueService.callStatusUpdate({
        id_antrian: payload.id_antrian,
        id_user: payload.id_user,
        status_panggil: 2,
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
      });
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
      await this.handleRemainingQueueCode(client, payload.kode_antrian);
    } catch (err) {
      if (err instanceof WsException || err instanceof HttpException) {
        throw new WsException(err.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('skip-and-call')
  async handleSkipAndCallQueue(client: Socket, payload: UpdateAdmissionDto) {
    try {
      await this.queueService.callStatusUpdate({
        id_antrian: payload.id_antrian,
        id_user: payload.id_user,
        status_panggil: 2,
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
      });
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
      await this.handleNextCallQueue(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
        id_user: payload.id_user,
      });
      await this.handleRemainingQueueCode(client, payload.kode_antrian);
    } catch (err) {
      if (err instanceof WsException || err instanceof HttpException) {
        throw new WsException(err.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('recall-skipped')
  async handleRecall(client: Socket, payload: UpdateAdmissionDto) {
    try {
      await this.handleCallingQueue(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        user_id: payload.id_user,
        id_antrian: payload.id_antrian,
      });
    } catch (err) {
      if (err instanceof WsException || err instanceof HttpException) {
        throw new WsException(err.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('calling')
  async handleCallingQueue(client: Socket, payload: CallingAdmissionDto) {
    try {
      const result = await this.queueService.updateQueueCounterId(payload);
      this.server.emit('calling-to-display', {
        data: result,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Gagal memproses pemanggilan antrian');
    }
  }

  @Public()
  @SubscribeMessage('display-init')
  async handleAdmissionQueueDisplayInit() {
    try {
      const COUNTER_TYPE: number = 1;
      const counters =
        await this.counterService.findQueueDisplayCounter(COUNTER_TYPE);
      this.server.emit(`admission-display`, {
        data: counters,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Gagal menginisialisasi data dari display antrian');
    }
  }

  @SubscribeMessage('admission-attendance')
  async handleQueueAttendance(client: Socket, payload: UpdateAdmissionDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }
      const registraion =
        await this.registrationService.findRegistrationByQueueId(
          Number(payload.id_antrian),
        );
      if (registraion) {
        throw new WsException(
          'Data antrean tersebut sudah memiliki data pendaftaran (sudah dilayani)',
        );
      }
      await this.queueService.queueAttendance(payload);
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
      await this.handleNextCallQueue(client, {
        id_user: payload.id_user,
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('admission-attend-and-continue-registration')
  async handleQueueAttendanceAndContinueRegisration(
    client: Socket,
    payload: UpdateAdmissionDto,
  ) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }
      const existringRegistration =
        await this.registrationService.findRegistrationByQueueId(
          Number(payload.id_antrian),
        );
      if (existringRegistration) {
        throw new WsException(
          'Data antrean tersebut sudah memiliki data pendaftaran (sudah dilayani)',
        );
      }
      const result =
        await this.queueService.queueAttendanceWithRegistration(payload);
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
      if (result) {
        this.server.emit(`queue-registration-result-${client.id}`, {
          data: result,
        });
      } else {
        throw new WsException('Terjadi kesalahan saat memproses antrian');
      }
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('cancel-and-call')
  async handleCancelAndCallQueue(client: Socket, payload: UpdateAdmissionDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      await this.queueService.statusUpdate({
        id_antrian: payload.id_antrian,
        id_user: payload.id_user,
        status_panggil: 1,
        status: 2,
      });
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
      await this.handleNextCallQueue(client, {
        id_user: payload.id_user,
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('cancel')
  async handleCancelQueue(client: Socket, payload: UpdateAdmissionDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }
      await this.queueService.statusUpdate({
        id_antrian: payload.id_antrian,
        id_user: payload.id_user,
        status_panggil: 1,
        status: 2,
      });
      await this.handleSkipInit(client, {
        id_ms_loket_antrian: payload.id_ms_loket_antrian,
        kode_antrian: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }
}
