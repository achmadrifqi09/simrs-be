import { RegistrationTaskIdDto } from './../dto/queue/task-id.dto';
import {
  Injectable,
  Dependencies,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BPJSHttpHelper } from '../helper/bpjs-http.helper';
import { FirstUpdateTaskIdDto, TaskIdDto } from '../dto/queue/task-id.dto';
import moment from 'moment-timezone';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { BPJSResource } from 'src/common/enums/bpjs-resource-type';
import { BPJSTaskIdRepository } from '../repository/bpjs-task-id.repository';
import { generateCurrentDate } from 'src/utils/date-formatter';
import { BPJSQueueRepository } from '../repository/bpjs-queue.repository';

@Dependencies([BPJSHttpHelper, BPJSTaskIdRepository, BPJSQueueRepository])
@Injectable()
export class TaskIdService {
  constructor(
    private readonly bpjsHttpHelper: BPJSHttpHelper,
    private readonly bpjsTaskIdRepository: BPJSTaskIdRepository,
    private readonly bpjsQueueRepository: BPJSQueueRepository,
  ) {}
  private BASE_URL = `${process.env.BASE_URL}/${process.env.QUEUE_SERVICE_NAME}/antrean`;

  async updateTaskIdFromClient(
    taskIdPayload: TaskIdDto,
    registrationId: number,
  ) {
    const registration =
      await this.bpjsQueueRepository.findRegistrationById(registrationId);
    if (!registration) {
      throw new HttpException(
        `Pendaftaran dengan kode booking ${taskIdPayload.kodebooking} tidak ditemukan`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const resultStatus: number = await this.updateTaskId(
      taskIdPayload,
      Number(registrationId),
    );
    if (Number(resultStatus) === 208) {
      throw new HttpException(
        `Kode booking ${taskIdPayload.kodebooking} dengan task id ${taskIdPayload.taskid} sudah ada`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(resultStatus) !== 200) {
      throw new HttpException(
        `Gagal memeperbarui task id dengan kode booking ${taskIdPayload.kodebooking}, pastikan task id sebelumnya tidak terlewat`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (Number(resultStatus) === 200) {
      await this.bpjsTaskIdRepository.updateTaskIdOnRegistration(
        registrationId,
        Number(taskIdPayload.taskid),
      );
    }
    return taskIdPayload;
  }

  async updateTaskId(
    taskIdPayload: TaskIdDto,
    registrationId: number,
  ): Promise<number> {
    const url = `${this.BASE_URL}/updatewaktu`;
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.QUEUE,
    );
    const response = await axios.post(url, taskIdPayload, {
      headers: headers,
    });

    const result = response?.data?.response
      ? this.bpjsHttpHelper.responseChecker(
          response.data,
          headers.get('X-timestamp').toString(),
        )
      : null;

    const registrationTaskId =
      await this.bpjsTaskIdRepository.findRegistrationTaskId(
        taskIdPayload.kodebooking,
        taskIdPayload.taskid,
      );

    const registrationTaskPayload: RegistrationTaskIdDto = {
      id_pendaftaran: registrationId,
      kode_task_id: Number(taskIdPayload.taskid),
      kode_booking: taskIdPayload.kodebooking,
      tanggal_kirim: generateCurrentDate(),
      kode_response: response?.data?.metadata?.code || 0,
      pesan_response: response?.data?.metadata?.message || 0,
      request_body: JSON.stringify(taskIdPayload),
      response: JSON.stringify(result ?? response?.data),
    };

    if (registrationTaskId) {
      if (registrationTaskId.kode_response !== 200) {
        await this.bpjsTaskIdRepository.updateRegistrationTaskId(
          registrationTaskId.id,
          { ...registrationTaskPayload, modified_at: generateCurrentDate() },
        );
      }
    } else if (!registrationTaskId) {
      await this.bpjsTaskIdRepository.createRegistrationTaskId({
        ...registrationTaskPayload,
        created_at: generateCurrentDate(),
      });
    }

    return Number(response.data?.metadata?.code);
  }

  async firstUpdateTaskId(
    payload: FirstUpdateTaskIdDto,
    isNewPatient: boolean = false,
  ) {
    let time = this.timeManipulation(payload.startTime, isNewPatient);
    for (let task: number = 1; task <= 3; task++) {
      const resultStatus = await this.updateTaskId(
        {
          kodebooking: payload.bookingCode,
          waktu: time,
          taskid: task,
        },
        payload.regisrationId,
      );

      if (resultStatus !== 200 && task !== 1) {
        await this.bpjsTaskIdRepository.updateTaskIdOnRegistration(
          payload.regisrationId,
          task - 1,
        );
        break;
      }

      if (task === 3 && resultStatus === 200) {
        await this.bpjsTaskIdRepository.updateTaskIdOnRegistration(
          payload.regisrationId,
          3,
        );
      }

      if (resultStatus === 200) {
        time = this.timeManipulation(time, isNewPatient);
      }
    }
  }

  private timeManipulation(
    date: string | number,
    isNewPatient: boolean = false,
  ): number {
    if (date.toString().includes('.000Z')) {
      date = date.toString().replace('.00Z', '');
      date.toString().replace('T', ' ');
    }
    const momentDate =
      typeof date === 'number'
        ? moment(date).tz('Asia/Jakarta')
        : moment(date, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Jakarta');
    momentDate.add(this.generateAdditionRandomTime(isNewPatient), 'minutes');
    return momentDate.valueOf();
  }

  async findInternalTaskId(bookingCode: string) {
    return this.bpjsTaskIdRepository.findInternalTaskId(bookingCode);
  }

  async findBPJSTaskId(bookingCode: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.QUEUE,
    );
    const url = `${this.BASE_URL}/getlisttask`;
    try {
      const response = await axios.post(
        url,
        { kodebooking: bookingCode },
        {
          headers: headers,
        },
      );

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
        throw new HttpException(error.getResponse, HttpStatus.BAD_REQUEST);
      }
    }
  }

  private generateAdditionRandomTime(isNewPatient: boolean): number {
    const min = isNewPatient ? 3 : 1;
    const max = isNewPatient ? 5 : 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
