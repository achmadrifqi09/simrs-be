import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  AdditionalQuotaDTO,
  CurrentDoctorScheduleDTO,
  DoctorScheduleDTO,
  DoctorVacationDTO,
  ScheduleQuota,
} from '../dto/doctor-schedule.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { timeFormatter } from '../../../utils/date-formatter';
import { SoftDelete } from '../../../common/types/common.type';
import { bigIntReplacer } from '../../../utils/helper';
import {
  generateDateString,
  generateIsoDate,
} from '../../../utils/date-generator';

@Dependencies([PrismaService])
@Injectable()
export class DoctorScheduleRepository {
  constructor(private readonly prismaService: PrismaService) {}

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

  async findDoctorScheduleById(id: number) {
    return this.prismaService.doctorSchedule.findFirst({
      where: {
        id_jadwal_dokter: Number(id),
        is_deleted: false,
      },
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
        pegawai: {
          select: {
            id_pegawai: true,
            nama_pegawai: true,
            gelar_depan: true,
            gelar_belakang: true,
          },
        },
        unit: {
          select: { id: true, nama_unit_kerja: true },
        },
      },
    });
  }

  async findScheduleQuota(scheduleId: number) {
    const practiceDate = generateDateString();

    const result = await this.prismaService.$queryRaw<ScheduleQuota>(
      Prisma.sql`
      SELECT
        jadwal.id_jadwal_dokter,
        jadwal.kuota_mjkn + COALESCE(kuota_tambahan.kuota_mjkn, 0) AS kuota_mjkn,
        jadwal.kuota_online_umum + COALESCE(kuota_tambahan.kuota_online_umum, 0) AS kuota_online_umum,
        CAST(
          (
            (jadwal.kuota_mjkn - CAST(COALESCE(COUNT(DISTINCT online_mjkn.id_antrian), 0) AS UNSIGNED)) +
            (jadwal.kuota_online_umum - CAST(COALESCE(COUNT(DISTINCT online_umum.id_antrian), 0) AS UNSIGNED))
            + COALESCE(kuota_tambahan.kuota_onsite, 0)
            + jadwal.kuota_onsite
           ) AS UNSIGNED
        ) AS kuota_onsite
        FROM db_jadwal_dokter AS jadwal
                 LEFT JOIN (
            SELECT
                kuota_tambahan.id_jadwal_dokter,
                kuota_tambahan.kuota_onsite,
                kuota_tambahan.kuota_mjkn,
                kuota_tambahan.kuota_online_umum
            FROM db_kuota_tambahan_jadwal_dokter AS kuota_tambahan
        ) kuota_tambahan ON jadwal.id_jadwal_dokter = kuota_tambahan.id_jadwal_dokter
                 LEFT JOIN (
            SELECT
                pendaftaran.id_antrian,
                pendaftaran.tgl_kunjungan,
                pendaftaran.id_jadwal_dokter,
                pendaftaran.status,
                pendaftaran.asal_pengambilan
            FROM db_pendaftaran_online AS pendaftaran
            WHERE
                asal_pengambilan = 1
              AND status != 2
              AND pendaftaran.tgl_kunjungan LIKE CONCAT(${Prisma.sql`${practiceDate}`}, '%')
              AND pendaftaran.is_deleted = FALSE
        ) online_mjkn ON jadwal.id_jadwal_dokter = online_mjkn.id_jadwal_dokter
                 LEFT JOIN (
            SELECT
                pendaftaran.id_antrian,
                pendaftaran.tgl_kunjungan,
                pendaftaran.id_jadwal_dokter,
                pendaftaran.status,
                pendaftaran.asal_pengambilan
            FROM db_pendaftaran_online AS pendaftaran
            WHERE
                asal_pengambilan = 2
              AND status != 2
              AND pendaftaran.tgl_kunjungan LIKE  CONCAT(${Prisma.sql`${practiceDate}`}, '%')
              AND pendaftaran.is_deleted = FALSE
        ) online_umum ON jadwal.id_jadwal_dokter = online_umum.id_jadwal_dokter
        WHERE
            jadwal.id_jadwal_dokter = ${Number(scheduleId)}
          AND jadwal.is_deleted = FALSE
        GROUP BY
            jadwal.id_jadwal_dokter,
            kuota_tambahan.kuota_mjkn,
            kuota_tambahan.kuota_online_umum,
            kuota_tambahan.kuota_onsite,
            jadwal.kuota_mjkn,
            jadwal.kuota_online_umum,
            jadwal.kuota_onsite;
      `,
    );
    return JSON.parse(JSON.stringify(result[0], bigIntReplacer));
  }

  async findCurrentDoctorScheduleByUnit(installationCode: string) {
    const practiceDate = generateDateString();
    const isoDay = generateIsoDate();

    try {
      const schedules = await this.prismaService.$queryRaw<
        CurrentDoctorScheduleDTO[]
      >(
        Prisma.sql`
        SELECT
            jadwal.id_jadwal_dokter,
            jadwal.id_pegawai,
            jadwal.kode_instalasi_bpjs,
            jadwal.jenis_jadwal,
            jadwal.hari_praktek,
            jadwal.tgl_praktek,
            jadwal.jam_buka_praktek,
            jadwal.jam_tutup_praktek,
            CAST(
                (
                    (jadwal.kuota_mjkn - CAST(COALESCE(COUNT(DISTINCT online_mjkn.id_antrian), 0) AS UNSIGNED)) +
                    (jadwal.kuota_online_umum - CAST(COALESCE(COUNT(DISTINCT online_umum.id_antrian), 0) AS UNSIGNED))
                    + COALESCE(kuota_tambahan.kuota_onsite, 0)
                    + jadwal.kuota_onsite
                ) AS UNSIGNED
            ) AS kuota_onsite,
            CAST(COALESCE(COUNT(antrian_onsite.id_antrian), 0) AS UNSIGNED) AS kuota_terisi,
            jadwal.tanggal_libur,
            jadwal.keterangan_libur,
            pegawai.id_pegawai,
            pegawai.nama_pegawai,
            pegawai.gelar_depan,
            pegawai.gelar_belakang
        FROM
            db_jadwal_dokter jadwal
        LEFT JOIN db_pegawai pegawai ON jadwal.id_pegawai = pegawai.id_pegawai
        LEFT JOIN db_kuota_tambahan_jadwal_dokter kuota_tambahan
            ON jadwal.id_jadwal_dokter = kuota_tambahan.id_jadwal_dokter
            AND kuota_tambahan.tanggal_diterapkan = ${Prisma.sql`${practiceDate}`}
            AND kuota_tambahan.is_deleted = FALSE
        LEFT JOIN (
            SELECT
                antrian.id_antrian,
                antrian.created_at,
                antrian.id_jadwal_dokter,
                antrian.status
            FROM db_antrian AS antrian
            WHERE
                antrian.created_at LIKE CONCAT(${Prisma.sql`${practiceDate}`}, '%')
                AND antrian.status != 2
                AND antrian.is_deleted = FALSE
        ) antrian_onsite ON jadwal.id_jadwal_dokter = antrian_onsite.id_jadwal_dokter
        LEFT JOIN (
            SELECT
                pendaftaran.id_antrian,
                pendaftaran.tgl_kunjungan,
                pendaftaran.id_jadwal_dokter,
                pendaftaran.status,
                pendaftaran.asal_pengambilan
            FROM db_pendaftaran_online AS pendaftaran
            WHERE
                asal_pengambilan = 1
                AND status != 2
                AND pendaftaran.tgl_kunjungan LIKE CONCAT(${Prisma.sql`${practiceDate}`}, '%')
                AND pendaftaran.is_deleted = FALSE
        ) online_mjkn ON jadwal.id_jadwal_dokter = online_mjkn.id_jadwal_dokter
        LEFT JOIN (
            SELECT
                pendaftaran.id_antrian,
                pendaftaran.tgl_kunjungan,
                pendaftaran.id_jadwal_dokter,
                pendaftaran.status,
                pendaftaran.asal_pengambilan
            FROM db_pendaftaran_online AS pendaftaran
            WHERE
                asal_pengambilan = 2
                AND status != 2
                AND pendaftaran.tgl_kunjungan LIKE CONCAT(${Prisma.sql`${practiceDate}`}, '%')
                AND pendaftaran.is_deleted = FALSE
        ) online_umum ON jadwal.id_jadwal_dokter = online_umum.id_jadwal_dokter
        WHERE
            (jadwal.tgl_praktek = ${Prisma.sql`${practiceDate}`} OR jadwal.hari_praktek = ${isoDay})
            AND jadwal.kode_instalasi_bpjs = ${Prisma.sql`${installationCode}`}
            AND jadwal.is_deleted = FALSE
        GROUP BY
            jadwal.id_jadwal_dokter, jadwal.id_pegawai, jadwal.kode_instalasi_bpjs, jadwal.jenis_jadwal,
            jadwal.hari_praktek, jadwal.tgl_praktek, jadwal.jam_buka_praktek, jadwal.jam_tutup_praktek,
            jadwal.tanggal_libur, jadwal.keterangan_libur, pegawai.id_pegawai, pegawai.nama_pegawai,
            pegawai.gelar_depan, pegawai.gelar_belakang, kuota_tambahan.kuota_onsite;
        `,
      );
      return JSON.parse(JSON.stringify(schedules, bigIntReplacer));
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

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
