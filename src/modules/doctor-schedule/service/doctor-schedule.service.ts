import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DoctorScheduleRepository } from '../repository/doctor-schedule.repository';
import {
  AdditionalQuotaDTO,
  DoctorScheduleDTO,
  DoctorVacationDTO,
} from '../dto/doctor-schedule.dto';
import { generateCurrentDate } from '../../../utils/date-formatter';
import moment from 'moment-timezone';
import { SoftDelete } from '../../../common/types/common.type';

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
    this.validatePayload(schedule);
    const payload: DoctorScheduleDTO = {
      ...schedule,
      created_at: generateCurrentDate(),
      created_by: req?.user?.id,
    };
    return this.doctorScheduleRepository.createDoctorSchedule(payload);
  }

  async updateDoctorSchedule(
    id: number,
    schedule: DoctorScheduleDTO,
    req: any,
  ) {
    this.validatePayload(schedule);
    const payload: DoctorScheduleDTO = {
      ...schedule,
      modified_at: generateCurrentDate(),
      modified_by: req?.user?.id,
    };
    return this.doctorScheduleRepository.updateDoctorSchedule(id, payload);
  }

  async softDeleteDoctorSchedule(id: number, req: any) {
    if (!Number(id)) {
      throw new HttpException(
        'Id jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload: SoftDelete = {
      is_deleted: true,
      deleted_by: req?.user?.id,
      deleted_at: generateCurrentDate(),
    };

    return this.doctorScheduleRepository.softDeleteDoctorSchedule(id, payload);
  }

  private validatePayload(payload: DoctorScheduleDTO) {
    const openPracticeHour = moment(payload.jam_buka_praktek, 'HH:mm:ss');
    const closePracticeHour = moment(payload.jam_tutup_praktek, 'HH:mm:ss');
    if (
      openPracticeHour.isAfter(closePracticeHour) ||
      openPracticeHour.isSame(closePracticeHour)
    ) {
      throw new HttpException(
        'Jam buka praktek harus lebih awal dari jam tutup praktek',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (![1, 2].includes(Number(payload.jenis_jadwal))) {
      throw new HttpException(
        'Jenis jadwal tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      Number(payload.jenis_jadwal) === 1 &&
      isNaN(Number(payload.hari_praktek))
    ) {
      throw new HttpException(
        'Hari praktek harus di isi',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(payload.jenis_jadwal) === 2 && !payload.tgl_praktek) {
      throw new HttpException(
        'Tanggal praktek harus di isi',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async doctorVacation(id: number, payload: DoctorVacationDTO, req: any) {
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

    const payload: DoctorVacationDTO = {
      tanggal_libur: null,
      keterangan_libur: null,
      modified_at: generateCurrentDate(),
      modified_by: req.user?.id,
    };
    return this.doctorScheduleRepository.doctorVacation(id, payload);
  }

  async createAdditionDoctorQuota(
    scheduleId: number,
    additionalQuota: AdditionalQuotaDTO,
    req: any,
  ) {
    if (!Number(scheduleId)) {
      throw new HttpException(
        'Jadwal praktek dokter yang dipilih tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: AdditionalQuotaDTO = {
      ...additionalQuota,
      id_jadwal_dokter: Number(scheduleId),
      created_at: generateCurrentDate(),
      created_by: req?.user?.id,
    };
    return this.doctorScheduleRepository.createAdditionalDoctorQuota(payload);
  }

  async updateAdditionDoctorQuota(
    id: number,
    additionalQuota: AdditionalQuotaDTO,
    req: any,
  ) {
    if (!Number(id)) {
      throw new HttpException(
        'Id kuota tambahan jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload: AdditionalQuotaDTO = {
      ...additionalQuota,
      modified_at: generateCurrentDate(),
      modified_by: req?.user?.id,
    };

    return this.doctorScheduleRepository.updateAdditionalQuota(id, payload);
  }

  async softDeleteAdditionDoctorQuota(id: number, req: any) {
    if (!Number(id)) {
      throw new HttpException(
        'Id kuota tambahan jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload: SoftDelete = {
      is_deleted: true,
      deleted_by: req?.user?.id,
      deleted_at: generateCurrentDate(),
    };

    return this.doctorScheduleRepository.softDeleteAdditionalDoctorQuota(
      id,
      payload,
    );
  }
}
