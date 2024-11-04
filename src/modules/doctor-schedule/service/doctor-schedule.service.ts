import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DoctorScheduleRepository } from '../repository/doctor-schedule.repository';
import { DoctorScheduleDTO, DoctorVacation } from '../dto/doctor-schedule.dto';
import { generateCurrentDate } from '../../../utils/date-formatter';
import moment from 'moment-timezone';
import { UpdateStatus } from '../../../common/types/common.type';

@Dependencies([DoctorScheduleRepository])
@Injectable()
export class DoctorScheduleService {
  constructor(
    private readonly doctorScheduleRepository: DoctorScheduleRepository,
  ) {}
  async findDoctorSchedule(
    poly_code?: string,
    practice_date?: string,
    doctor_id?: number,
    keyword?: string,
    cursor?: number,
    take?: number,
  ) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
    if (practice_date) {
      if (!dateRegex.test(practice_date)) {
        throw new HttpException(
          'Format tanggal praktek harus DD-MM-YYYY',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return this.doctorScheduleRepository.findDoctorSchedule(
      poly_code,
      practice_date,
      doctor_id,
      keyword,
      cursor,
      take,
    );
  }

  async createDoctorSchedule(schedule: DoctorScheduleDTO, req: any) {
    const openPracticeHour = moment(schedule.jam_buka_praktek, 'HH:mm:ss');
    const closePracticeHour = moment(schedule.jam_tutup_praktek, 'HH:mm:ss');
    if (
      openPracticeHour.isAfter(closePracticeHour) ||
      openPracticeHour.isSame(closePracticeHour)
    ) {
      throw new HttpException(
        'Jam buka praktek harus lebih awal dari jam tutup praktek',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (![1, 2].includes(Number(schedule.jenis_jadwal))) {
      throw new HttpException(
        'Jenis jadwal tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      Number(schedule.jenis_jadwal) === 1 &&
      isNaN(Number(schedule.hari_praktek))
    ) {
      throw new HttpException(
        'Hari praktek harus di isi',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(schedule.jenis_jadwal) === 2 && !schedule.tgl_praktek) {
      throw new HttpException(
        'Tanggal praktek harus di isi',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: DoctorScheduleDTO = {
      ...schedule,
      created_at: generateCurrentDate(),
      created_by: req?.user?.id,
    };
    return this.doctorScheduleRepository.createDoctorSchedule(payload);
  }

  async doctorVacation(id: number, payload: DoctorVacation, req: any) {
    if (!Number(id)) {
      throw new HttpException(
        'Jadwal dokter (id) tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    payload = {
      ...payload,
      modified_at: generateCurrentDate(),
      modified_by: req.user?.id,
    };
    return this.doctorScheduleRepository.doctorVacation(Number(id), payload);
  }

  async cancelDoctorVacation(id: number, req: any) {
    if (!Number(id)) {
      throw new HttpException(
        'Jadwal dokter (id) tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: DoctorVacation = {
      tanggal_libur: null,
      keterangan_libur: null,
      modified_at: generateCurrentDate(),
      modified_by: req.user?.id,
    };
    return this.doctorScheduleRepository.doctorVacation(id, payload);
  }
}
