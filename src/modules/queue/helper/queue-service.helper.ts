import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DoctorScheduleService } from '../../doctor-schedule/service/doctor-schedule.service';
import { convertToTimeString } from '../../../utils/date-formatter';
import moment from 'moment-timezone';
import { generateIsoDate } from '../../../utils/date-generator';
import {
  Identifier,
  RegisterQueuePayload,
  QueueNumber,
} from '../dto/queue.dto';
import { QueueRepository } from '../repository/queue.repository';

@Dependencies([DoctorScheduleService, QueueRepository])
@Injectable()
export class QueueServiceHelper {
  constructor(
    private readonly doctorScheduleService: DoctorScheduleService,
    private readonly queueRepository: QueueRepository,
  ) {}

  async generateQueueNumber(closePracticeHour: Date, guarantorType: number) {
    const closePracticeHoursString = convertToTimeString(closePracticeHour);
    const currentTime = moment.tz('Asia/Jakarta');
    const changeoverTime = moment.tz(
      `${currentTime.format('YYYY-MM-DD')} 12:00:00`,
      'YYYY-MM-DD HH:mm:ss',
      'Asia/Jakarta',
    );
    const targetTime = moment.tz(
      `${currentTime.format('YYYY-MM-DD')} ${closePracticeHoursString}`,
      'YYYY-MM-DD HH:mm:ss',
      'Asia/Jakarta',
    );

    let queueCode: string;
    if (currentTime.isAfter(targetTime)) {
      throw new HttpException(
        'Jam praktek dokter telah tutup',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (![1, 2].includes(guarantorType)) {
      throw new HttpException(
        'Jenis penjamin tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (guarantorType === 1) {
      queueCode = targetTime.isAfter(changeoverTime) ? 'D' : 'C';
    }

    if (guarantorType === 2) {
      queueCode = targetTime.isAfter(changeoverTime) ? 'B' : 'A';
    }

    const onsiteQueueCount =
      await this.queueRepository.findTotalAndRemainingOnsiteQueue(queueCode);

    const queueNumber =
      Number(onsiteQueueCount.jumlah_antrian_onsite) === 0
        ? 1
        : Number(onsiteQueueCount.jumlah_antrian_onsite) + 1;

    const result: QueueNumber = {
      kode_antrian: queueCode,
      no_antrian: queueNumber,
    };
    return result;
  }

  async checkScheduleQuota(totalDoctorQueue: number, scheduleId: number) {
    const scheduleQuota =
      await this.doctorScheduleService.findScheduleQuota(scheduleId);

    if (totalDoctorQueue >= Number(scheduleQuota.kuota_onsite)) {
      throw new HttpException('Kuota dokter penuh', HttpStatus.BAD_REQUEST);
    }
  }

  async checkAndGetDoctorSchedule(id: number) {
    if (isNaN(Number(id))) {
      throw new HttpException(
        'Id jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const doctorSchedule =
      await this.doctorScheduleService.findDoctorScheduleById(id);

    if (!doctorSchedule) {
      throw new HttpException(
        'jadwal dokter tidak ditemukan',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      doctorSchedule?.hari_praktek &&
      doctorSchedule.hari_praktek != generateIsoDate()
    ) {
      throw new HttpException(
        `Dokter ${doctorSchedule?.pegawai?.nama_pegawai} tidak memiliki jadwal praktek di hari ini`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return doctorSchedule;
  }

  findIdentifierType(queue: RegisterQueuePayload) {
    const identifier: Identifier = {
      number: null,
      type: 0,
    };
    if (queue?.kode_rm) {
      identifier.type = 1;
      identifier.number = queue.kode_rm;
      return identifier;
    }
    if (queue?.no_bpjs) {
      identifier.type = 2;
      identifier.number = queue.no_bpjs;
      return identifier;
    }
    return identifier;
  }
}
