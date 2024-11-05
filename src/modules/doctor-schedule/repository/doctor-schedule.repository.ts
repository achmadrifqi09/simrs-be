import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  AdditionalQuotaDTO,
  DoctorScheduleDTO,
  DoctorVacationDTO,
} from '../dto/doctor-schedule.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { timeFormatter } from '../../../utils/date-formatter';
import { SoftDelete } from '../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class DoctorScheduleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDoctorSchedule(schedule: DoctorScheduleDTO) {
    try {
      return await this.prismaService.doctorSchedule.create({
        data: {
          ...schedule,
          jam_buka_praktek: timeFormatter(schedule.jam_buka_praktek),
          jam_tutup_praktek: timeFormatter(schedule.jam_tutup_praktek),
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateDoctorSchedule(id: number, schedule: DoctorScheduleDTO) {
    try {
      return await this.prismaService.doctorSchedule.update({
        where: {
          id_jadwal_dokter: Number(id),
          is_deleted: false,
        },
        data: {
          ...schedule,
          jam_buka_praktek: timeFormatter(schedule.jam_buka_praktek),
          jam_tutup_praktek: timeFormatter(schedule.jam_tutup_praktek),
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteDoctorSchedule(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.doctorSchedule.update({
        where: {
          id_jadwal_dokter: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async doctorVacation(id: number, payload: DoctorVacationDTO) {
    try {
      return await this.prismaService.doctorSchedule.update({
        where: {
          id_jadwal_dokter: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findDoctorSchedule(
    poly_code?: string,
    practice_date?: string,
    doctor_id?: number,
    keyword?: string,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.DoctorScheduleWhereInput = {
      OR: [
        {
          unit: {
            nama_unit_kerja: { contains: keyword || '' },
          },
        },
        {
          pegawai: {
            nama_pegawai: { contains: keyword || '' },
          },
        },
      ],
      is_deleted: false,
    };

    if (Number(doctor_id)) {
      whereClause.pegawai = { id_pegawai: Number(doctor_id) };
    }

    if (poly_code && poly_code !== '') {
      whereClause.kode_instalasi_bpjs = poly_code;
    }

    let practiceDate: Date | undefined = undefined;
    if (practice_date && practice_date !== '') {
      const [day, month, year] = practice_date.split('-').map(Number);
      practiceDate = new Date(Date.UTC(year, month - 1, day));
      const isoDay = ((practiceDate.getDay() + 6) % 7) + 1;
      whereClause.AND = [
        {
          OR: [{ tgl_praktek: practiceDate }, { hari_praktek: isoDay }],
        },
      ];
    }
    const results = await this.prismaService.doctorSchedule.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      select: {
        id_jadwal_dokter: true,
        id_pegawai: true,
        kode_instalasi_bpjs: true,
        jenis_jadwal: true,
        hari_praktek: true,
        tgl_praktek: true,
        jam_buka_praktek: true,
        jam_tutup_praktek: true,
        kuota_online_umum: true,
        kuota_mjkn: true,
        kuota_onsite: true,
        tanggal_libur: true,
        keterangan_libur: true,
        unit: {
          select: { id: true, nama_unit_kerja: true },
        },
        pegawai: {
          select: {
            id_pegawai: true,
            nama_pegawai: true,
            gelar_depan: true,
            gelar_belakang: true,
          },
        },
        kuota_tambahan: {
          select: {
            id_kuota_tambahan: true,
            kuota_mjkn: true,
            kuota_onsite: true,
            kuota_online_umum: true,
            tanggal_diterapkan: true,
          },
          where: practiceDate
            ? { tanggal_diterapkan: practiceDate, is_deleted: false }
            : undefined,
        },
      },
      orderBy: {
        id_pegawai: 'desc',
      },
    });

    return {
      results: results,
      pagination: {
        current_cursor: Number(cursor) || 0,
        take: Number(take) || 10,
      },
    };
  }

  async createAdditionalDoctorQuota(additionalQuota: AdditionalQuotaDTO) {
    try {
      return await this.prismaService.additionalDoctorQuota.create({
        data: additionalQuota,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateAdditionalQuota(id: number, additionalQuota: AdditionalQuotaDTO) {
    try {
      return await this.prismaService.additionalDoctorQuota.update({
        where: {
          id_kuota_tambahan: Number(id),
          is_deleted: false,
        },
        data: additionalQuota,
      });
    } catch (error) {
      console.log(error);
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteAdditionalDoctorQuota(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.additionalDoctorQuota.update({
        where: {
          id_kuota_tambahan: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
