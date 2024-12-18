import { BPJSQueueRepository } from './../repository/bpjs-queue.repository';
import { generateBookingCode } from './../../../utils/unique-code-generator';
import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BPJSHttpHelper } from '../helper/bpjs-http.helper';
import { BPJSResource } from '../../../common/enums/bpjs-resource-type';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import * as process from 'node:process';
import {
  BPJSQueueDto,
  BPJSQueueInputPayloadDto,
  QueueCancellationDto,
} from '../dto/queue/queue.dto';
import moment from 'moment-timezone';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateTaskIdEvent } from 'src/events/event/update-task-id.event';
import { generateCurrentDate } from 'src/utils/date-formatter';
import { TaskIdDto } from '../dto/queue/task-id.dto';

@Dependencies([BPJSHttpHelper, BPJSQueueRepository, EventEmitter2])
@Injectable()
export class BPJSQueueService {
  constructor(
    private readonly bpjsHttpHelper: BPJSHttpHelper,
    private readonly bpjsQueueRepository: BPJSQueueRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private BASE_URL = `${process.env.BASE_URL}/${process.env.QUEUE_SERVICE_NAME}/antrean`;

  async queueAdd(queuePayload: BPJSQueueInputPayloadDto) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.QUEUE,
    );
    const url = `${this.BASE_URL}/add`;
    try {
      const bookingCode = generateBookingCode();
      const queue = await this.bpjsQueueRepository.findQueue(
        queuePayload.idantrian,
      );
      if (!queue) {
        throw new HttpException(
          'Data antrian tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      const registration = await this.bpjsQueueRepository.findRegistrationById(
        queuePayload.idpendaftaran,
      );
      if (!registration) {
        throw new HttpException(
          'Pasien tersebut tidak memiliki data pendaftaran',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (registration?.task_id_terakhir) {
        throw new HttpException(
          'Pasien tersebut telah mengirimkan antrean ke BPJS',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (registration.status_kirim_bpjs) {
        throw new HttpException(
          'Antrean BPJS telah dikirim',
          HttpStatus.BAD_REQUEST,
        );
      }

      const doctorQuotaFilled =
        await this.bpjsQueueRepository.findDoctorQuotaFilled(
          queue.id_jadwal_dokter,
          queue.no_antrian,
        );
      if (doctorQuotaFilled.total_mjkn > queue.jadwal_dokter.kuota_mjkn) {
        throw new HttpException(
          'Kuota dokter sudah penuh',
          HttpStatus.BAD_REQUEST,
        );
      }
      const estimateServiceTime = this.generateEstimatePatientServiceTime(
        queuePayload.jenispasien === 'JKN'
          ? doctorQuotaFilled.total_mjkn
          : doctorQuotaFilled.total_non_mjkn,
      );
      const remainingMJKNQuota =
        Number(queue?.jadwal_dokter.kuota_mjkn) - doctorQuotaFilled.total_mjkn;
      const remainingNonMJKNQuota =
        Number(queue?.jadwal_dokter.kuota_onsite) +
        Number(queue?.jadwal_dokter.kuota_onsite) -
        doctorQuotaFilled.total_mjkn;

      const registrationId = queuePayload.idpendaftaran;
      delete queuePayload.idantrian;
      delete queuePayload.idpendaftaran;

      const payloadToAddQueue: BPJSQueueDto = {
        ...queuePayload,
        kodebooking: bookingCode,
        nomorkartu:
          queuePayload.jenispasien === 'NON JKN' ? '' : queuePayload.nomorkartu,
        nomorreferensi:
          queuePayload.jenispasien === 'NON JKN'
            ? ''
            : queuePayload.nomorreferensi,
        estimasidilayani: estimateServiceTime,
        sisakuotajkn: remainingMJKNQuota,
        kuotajkn: queue.jadwal_dokter.kuota_mjkn,
        sisakuotanonjkn: remainingNonMJKNQuota,
        kuotanonjkn:
          Number(queue.jadwal_dokter.kuota_online_umum) +
          Number(queue.jadwal_dokter.kuota_onsite),
        keterangan:
          'Peserta harap 30 menit lebih awal guna pencatatan administrasi.',
      };

      const response = await axios.post(url, payloadToAddQueue, {
        headers: headers,
      });

      if (response.data?.metadata?.code === 200) {
        await this.bpjsQueueRepository.updateStatusAndBookingCode(
          registrationId,
          bookingCode,
        );
        this.eventEmitter.emit(
          'bpjs.task-id-update',
          new UpdateTaskIdEvent(
            {
              bookingCode: bookingCode,
              startTime: generateCurrentDate().toISOString(),
              regisrationId: Number(registrationId),
            },
            payloadToAddQueue.jenispasien === 'JKN',
          ),
        );
      } else {
        throw new HttpException(
          response?.data?.metadata?.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          error?.message || error,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  private generateEstimatePatientServiceTime(queueTotal: number) {
    const ESTIMATE_PATIENT_SERVICE_TIME: number =
      Number(process.env.ESTIMATE_PATIENT_SERVICE_TIME) || 0;
    const currentDate = moment.tz('Asia/Jakarta');
    const date = currentDate.add(
      (queueTotal === 0 ? 1 : queueTotal) * ESTIMATE_PATIENT_SERVICE_TIME,
      'minutes',
    );
    return date.valueOf();
  }

  async queueCancelation(payload: QueueCancellationDto) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.QUEUE,
    );
    const url = `${this.BASE_URL}/batal`;

    try {
      const response = await axios.post(url, payload, {
        headers: headers,
      });
      if (response?.data?.metadata?.code !== 200) {
        throw new HttpException(
          response.data?.metadata?.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      return Number(response?.data?.metadata?.code);
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error instanceof AxiosError) {
        throw new HttpException(
          error?.message || error,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
