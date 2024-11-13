import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DoctorScheduleService } from '../../doctor-schedule/service/doctor-schedule.service';
import { convertToTimeString } from '../../../utils/date-formatter';
import moment from 'moment-timezone';
import { generateDateString, generateIsoDate } from '../../../utils/date-generator';
@Dependencies([DoctorScheduleService])
@Injectable()
export class QueueServiceHelper {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  generateOnsiteQueueCode(closePracticeHour: Date, guarantorType: number) {
    const closePracticeHoursString = convertToTimeString(closePracticeHour);
    const changeoverTime = moment.tz('13:00:00', 'HH:mm:ss', 'Asia/Jakarta');
    const currentTime = moment.tz('Asia/Jakarta');
    const targetTime = moment.tz(
      closePracticeHoursString,
      'HH:mm:ss',
      'Asia/Jakarta',
    );

    if (currentTime.isAfter(targetTime)) {
      throw new HttpException(
        'Jam praktek dokter telah tutup',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (guarantorType === 1) {
      return targetTime.isAfter(changeoverTime) ? 'D' : 'C';
    }

    if (guarantorType === 2) {
      return targetTime.isAfter(changeoverTime) ? 'B' : 'A';
    }

    throw new HttpException(
      'Jenis penjamin tidak valid',
      HttpStatus.BAD_REQUEST,
    );
  }

  async checkAndGetDoctorSchedule(id: number) {
    if (!Number(id)) {
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
}
