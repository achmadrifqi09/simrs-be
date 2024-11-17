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
import { QueueService } from '../../../modules/queue/service/queue.service';
import { CounterService } from '../../../modules/master/counter/service/counter.service';
import { Public } from '../../../decorators/public/public.decorator';
import { AdmissionQueueInitDto } from '../dto/admission-queue-init.dto';
import { AdmissionQueueCallingDto } from '../dto/admission-queue-calling.dto';
import { AdmissionQueueSkippedDto } from '../dto/admission-queue-skipped.dto';
import { AdmissionQueueDto } from '../dto/admission-queue.dto';

@UseGuards(WsGuard)
@UseFilters(WsExceptionFilter)
@WebSocketGateway(Number(process.env.APP_WS_PORT) || 3002, {
  namespace: 'admission-queue',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
})
export class AdmissionQueueGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly counterGateway: CounterGateway,
    private readonly counterService: CounterService,
    private readonly queueService: QueueService,
  ) {}

  @SubscribeMessage('admission-queue')
  async handleGetQueue(client: Socket, payload: AdmissionQueueInitDto) {
    try {
      if (!this.counterGateway.findCounter(payload.counter_id)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      const queues = await this.queueService.findFirstQueueByCode(
        payload.queue_code,
      );

      this.server.emit(`admission-queue-${payload.counter_id}`, {
        data: queues,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @Public()
  @SubscribeMessage('admission-queue-display-init')
  async handleAdmissionQueueDisplay() {
    try {
      const COUNTER_TYPE: number = 1;
      const counters =
        await this.counterService.findQueueDisplayCounter(COUNTER_TYPE);
      this.server.emit(`admission-queue-display`, {
        data: counters,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Gagal menginisialisasi data dari display antrian');
    }
  }

  @SubscribeMessage('admission-queue-skipped-init')
  async handleAdmissionQueueSkippedInit(
    client: Socket,
    payload: AdmissionQueueInitDto,
  ) {
    try {
      if (!this.counterGateway.findCounter(payload.counter_id)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      const queues = await this.queueService.findSkippedQueue(
        payload.counter_id,
        payload.queue_code,
      );

      this.server.emit(`admission-queue-skipped-${payload.counter_id}`, {
        data: queues,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('admission-queue-calling')
  async handleCallingQueue(client: Socket, payload: AdmissionQueueCallingDto) {
    try {
      const result = await this.queueService.updateQueueCounterId(payload);
      this.server.emit('admission-queue-calling-to-display', {
        data: result,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Gagal memproses pemanggilan antrian');
    }
  }

  @SubscribeMessage('admission-queue-skip')
  async handleSkippedQueue(client: Socket, payload: AdmissionQueueSkippedDto) {
    try {
      if (!payload.status_paggil) payload.status_paggil = 2;
      await this.queueService.callStatusUpdate(payload);
      await this.handleAdmissionQueueSkippedInit(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });

      const queues = await this.queueService.findFirstQueueByCode(
        payload.kode_antrian,
      );
      if (queues) {
        const callingPayload: AdmissionQueueCallingDto = {
          id_antrian: queues.id_antrian,
          id_ms_loket_antrian: payload.id_ms_loket_antrian,
          user_id: payload.user_id,
        };
        await this.handleCallingQueue(client, callingPayload);
      }
      await this.handleAdmissionQueueSkippedInit(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
      await this.handleGetQueue(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Gagal memproses pemanggilan antrian');
    }
  }

  @SubscribeMessage('admission-queue-skipped-cancelled')
  async handleQueueCancellationInSkip(
    client: Socket,
    payload: AdmissionQueueDto,
  ) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }
      await this.queueService.statusUpdate({
        id_antrian: payload.id_antrian,
        user_id: payload.user_id,
        status: 2,
      });
      await this.handleAdmissionQueueSkippedInit(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('admission-queue-cancelled')
  async handleCancelQueue(client: Socket, payload: AdmissionQueueDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      await this.queueService.statusUpdate({
        id_antrian: payload.id_antrian,
        user_id: payload.user_id,
        status: 2,
      });

      const queues = await this.queueService.findFirstQueueByCode(
        payload.kode_antrian,
      );
      if (queues) {
        const callingPayload: AdmissionQueueCallingDto = {
          id_antrian: queues.id_antrian,
          id_ms_loket_antrian: payload.id_ms_loket_antrian,
          user_id: payload.user_id,
        };
        await this.handleCallingQueue(client, callingPayload);
      }

      await this.handleGetQueue(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }

  @SubscribeMessage('admission-queue-attendance')
  async handleQueueAttendance(client: Socket, payload: AdmissionQueueDto) {
    try {
      if (!this.counterGateway.findCounter(payload.id_ms_loket_antrian)) {
        throw new WsException('Anda belum terhubung ke loket manapun');
      }

      await this.queueService.queueAttendance(payload);

      const queues = await this.queueService.findFirstQueueByCode(
        payload.kode_antrian,
      );
      if (queues) {
        const callingPayload: AdmissionQueueCallingDto = {
          id_antrian: queues.id_antrian,
          id_ms_loket_antrian: payload.id_ms_loket_antrian,
          user_id: payload.user_id,
        };
        await this.handleCallingQueue(client, callingPayload);
      }

      await this.handleAdmissionQueueSkippedInit(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
      await this.handleGetQueue(client, {
        counter_id: payload.id_ms_loket_antrian,
        queue_code: payload.kode_antrian,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        throw new WsException(error.message);
      }
      throw new WsException('Terjadi kesalahan saat memproses antrian');
    }
  }
}
