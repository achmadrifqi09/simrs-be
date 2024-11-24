import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DoctorScheduleRepository } from '../repository/doctor-schedule.repository';
import {
  AdditionalQuotaDTO,
  CurrentDoctorScheduleDTO,
  DayOrDateScheduleDTO,
  Doctor,
  DoctorScheduleDTO,
  DoctorVacationDTO,
  RawScheduleData,
  ResponseDoctorScheduleDTO,
  ResponseSingleDoctorScheduleDTO,
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

  async findScheduleByDoctorIdAndUnitCode(
    doctorId: number,
    unitCode: string,
  ): Promise<ResponseSingleDoctorScheduleDTO | []> {
    const schedules =
      await this.doctorScheduleRepository.findScheduleByDoctorIdAndUnitCode(
        doctorId,
        unitCode,
      );

    if (!schedules.length) {
      return [];
    }

    return this.transformScheduleData(schedules);
  }

  private transformScheduleData(
    schedules: any[],
  ): ResponseSingleDoctorScheduleDTO {
    const result = this.initialSingleResponseDoctorSchedule();

    schedules.forEach((schedule) => {
      this.setDoctorInfo(result, schedule.pegawai);
      this.updateSchedule(result, schedule);
    });

    return result;
  }

  private initialSingleResponseDoctorSchedule(): ResponseSingleDoctorScheduleDTO {
    return {
      id_dokter: null,
      nama_dokter: '',
      gelar_depan: '',
      gelar_belakang: '',
      jadwal: [],
    };
  }

  private setDoctorInfo(
    result: ResponseSingleDoctorScheduleDTO,
    doctor: Doctor,
  ): void {
    if (!result.id_dokter) {
      result.id_dokter = Number(doctor.id_pegawai);
      result.nama_dokter = doctor.nama_pegawai;
      result.gelar_depan = doctor.gelar_depan;
      result.gelar_belakang = doctor.gelar_belakang;
    }
  }

  private updateSchedule(
    result: ResponseSingleDoctorScheduleDTO,
    schedule: RawScheduleData,
  ): void {
    const existingScheduleIndex = this.findExistingScheduleIndex(
      result.jadwal,
      schedule.hari_praktek,
    );

    if (existingScheduleIndex !== -1) {
      this.addPracticeTimeToExisting(
        result.jadwal[existingScheduleIndex],
        schedule,
      );
    } else {
      this.addNewSchedule(result.jadwal, schedule);
    }
  }

  private findExistingScheduleIndex(
    jadwal: DayOrDateScheduleDTO[],
    hariPraktek: number | null,
  ): number {
    return jadwal.findIndex(
      (practiceDay) => practiceDay.hari_praktek === hariPraktek,
    );
  }

  private addPracticeTimeToExisting(
    existingSchedule: DayOrDateScheduleDTO,
    schedule: RawScheduleData,
  ): void {
    existingSchedule.jam_praktek.push(this.createPracticeTimeEntry(schedule));
  }

  private addNewSchedule(
    jadwal: DayOrDateScheduleDTO[],
    schedule: RawScheduleData,
  ): void {
    jadwal.push({
      jenis_jadwal: schedule.jenis_jadwal,
      hari_praktek: schedule.hari_praktek,
      tgl_praktek: schedule.tgl_praktek,
      tanggal_libur: schedule.tanggal_libur,
      jam_praktek: [this.createPracticeTimeEntry(schedule)],
    });
  }

  private createPracticeTimeEntry(schedule: RawScheduleData) {
    return {
      id_jadwal_dokter: schedule.id_jadwal_dokter,
      jam_buka_praktek: schedule.jam_buka_praktek,
      jam_tutup_praktek: schedule.jam_tutup_praktek,
    };
  }

  async findScheduleQuota(scheduleId: number) {
    if (!Number(scheduleId)) {
      throw new HttpException(
        'Id jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.doctorScheduleRepository.findScheduleQuota(scheduleId);
  }

  async findDoctorScheduleById(id: number) {
    if (!Number(id)) {
      throw new HttpException(
        'Id jadwal dokter tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.doctorScheduleRepository.findDoctorScheduleById(id);
  }

  private createScheduleObject(schedule: CurrentDoctorScheduleDTO) {
    return {
      id_pegawai: schedule.id_pegawai,
      id_jadwal_dokter: schedule.id_jadwal_dokter,
      kode_instalasi_bpjs: schedule.kode_instalasi_bpjs,
      jenis_jadwal: schedule.jenis_jadwal,
      hari_praktek: schedule.hari_praktek,
      tgl_praktek: schedule.tgl_praktek,
      jam_buka_praktek: schedule.jam_buka_praktek,
      jam_tutup_praktek: schedule.jam_tutup_praktek,
      kuota_onsite: Number(schedule.kuota_onsite),
      kuota_terisi: Number(schedule.kuota_terisi),
      tanggal_libur: schedule.tanggal_libur,
      keterangan_libur: schedule.keterangan_libur,
    };
  }

  private createDoctorResponse(schedule: CurrentDoctorScheduleDTO) {
    return {
      id_pegawai: schedule.id_pegawai,
      nama_dokter: schedule.nama_pegawai,
      gelar_depan: schedule.gelar_depan,
      gelar_belakang: schedule.gelar_belakang,
      jadwal: [this.createScheduleObject(schedule)],
    };
  }

  private isNewSchedule(
    existingSchedules: any[],
    newScheduleId: number,
  ): boolean {
    return !existingSchedules.some(
      (schedule) => schedule.id_jadwal_dokter === newScheduleId,
    );
  }

  async findCurrentDoctorScheduleByUnitCode(
    installationCode: string,
  ): Promise<ResponseDoctorScheduleDTO[]> {
    const schedules =
      await this.doctorScheduleRepository.findCurrentDoctorScheduleByUnit(
        installationCode,
      );

    return schedules.reduce(
      (
        response: ResponseDoctorScheduleDTO[],
        schedule: CurrentDoctorScheduleDTO,
      ) => {
        const existingDoctor = response.find(
          (doctor) => doctor.id_pegawai === schedule.id_pegawai,
        );

        if (!existingDoctor) {
          response.push(this.createDoctorResponse(schedule));
        } else if (
          this.isNewSchedule(existingDoctor.jadwal, schedule.id_jadwal_dokter)
        ) {
          existingDoctor.jadwal.push(this.createScheduleObject(schedule));
        }
        return response;
      },
      [],
    );
  }

  async createDoctorSchedule(schedule: DoctorScheduleDTO, req: any) {
    await this.validatePayload(schedule);
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
    await this.validatePayload(schedule, false);
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

  private async validatePayload(
    payload: DoctorScheduleDTO,
    checkHasPractice: boolean = true,
  ) {
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

    if (payload?.tgl_praktek && payload?.hari_praktek) {
      throw new HttpException(
        'Tanggal atau hari praktek harus di sesuaikan dengan jenis jadwal',
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
    if (checkHasPractice) {
      const existingSchedule =
        await this.doctorScheduleRepository.findDoctorScheduleByDoctorIdAndDay(
          Number(payload.id_pegawai),
          payload.hari_praktek ?? payload.tgl_praktek,
        );
      if (existingSchedule) {
        const existingOpenPracticeHour = moment(
          existingSchedule.jam_buka_praktek.toISOString().split('T')[1],
          'HH:mm:ss',
        );
        const existingClosePracticeHour = moment(
          existingSchedule.jam_tutup_praktek.toISOString().split('T')[1],
          'HH:mm:ss',
        );
        if (
          openPracticeHour.isSameOrAfter(existingOpenPracticeHour) &&
          openPracticeHour.isSameOrBefore(existingClosePracticeHour)
        ) {
          throw new HttpException(
            'Jadwal praktek pada hari dan jam tersebut sudah ada',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (
          closePracticeHour.isSameOrAfter(existingOpenPracticeHour) &&
          closePracticeHour.isSameOrBefore(existingClosePracticeHour)
        ) {
          throw new HttpException(
            'Jadwal praktek pada hari dan jam tersebut sudah ada',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
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
