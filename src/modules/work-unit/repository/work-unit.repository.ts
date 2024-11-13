import { PrismaService } from '../../../prisma/prisma.service';
import { Dependencies } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PolyclinicCounter,
  WorkUnit,
  WorkUnitUpdateQueueStatus,
} from '../dto/work-unit.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { SoftDelete, UpdateStatus } from '../../../common/types/common.type';

@Dependencies([PrismaService])
export class WorkUnitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findActiveSubOrParentUnit(keyword?: string) {
    const whereClause: Prisma.WorkUnitWhereInput = {
      OR: [{ nama_unit_kerja: { contains: keyword } }],
      status: 1,
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    return this.prismaService.workUnit.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findQueueUnit(
    keyword?: string,
    unit_id?: number | undefined,
    service_type?: number,
  ) {
    const whereClause: Prisma.WorkUnitWhereInput = {
      OR: [
        {
          nama_unit_kerja: { contains: keyword },
        },
        {
          kode_instalasi_bpjs: { contains: keyword },
        },
      ],
      status_antrian: 1,
      status: 1,
      is_deleted: false,
    };

    if (Number(unit_id)) whereClause.id = Number(unit_id);
    if (Number(service_type))
      whereClause.jenis_pelayanan = Number(service_type);
    return this.prismaService.workUnit.findMany({
      where: whereClause,
    });
  }

  async findParentWorkUnit(keyword: string) {
    const whereClause: Prisma.WorkUnitWhereInput = {
      OR: [{ nama_unit_kerja: { contains: keyword } }],
      id_unit_induk: null,
      status: 1,
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    return this.prismaService.workUnit.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findQueueUnitByBPJSCode(BPJSCode: string) {
    return this.prismaService.workUnit.findFirst({
      where: {
        kode_instalasi_bpjs: BPJSCode,
      },
    });
  }

  async findAllWorkUnit(
    is_parent_unit: number,
    parent_id?: number,
    filed_id?: number,
    keyword?: string,
    service_type?: number,
    work_unit_id?: number,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.WorkUnitWhereInput = {
      is_deleted: false,
      is_parent_unit: Number(is_parent_unit) || 0,
      OR: [{ nama_unit_kerja: { contains: keyword } }],
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });

    if (!isNaN(Number(service_type))) {
      whereClause.jenis_pelayanan = Number(service_type);
    }

    if (Number(work_unit_id)) {
      whereClause.id_unit_induk = Number(work_unit_id);
    }

    if (Number(parent_id)) whereClause.id_unit_induk = Number(parent_id);

    if (Number(filed_id)) whereClause.id_bidang = Number(filed_id);

    const result = await this.prismaService.workUnit.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
  }

  async findActivePolyclinic(keyword?: string) {
    return this.prismaService.workUnit.findMany({
      where: {
        OR: [{ jenis_pelayanan: 1 }, { jenis_pelayanan: 2 }],
        AND: {
          status_antrian: 1,
        },
        nama_unit_kerja: {
          contains: keyword,
        },
        is_deleted: false,
      },
      select: {
        id: true,
        nama_unit_kerja: true,
        jenis_pelayanan: true,
        kode_instalasi_bpjs: true,
        status_antrian: true,
        id_unit_induk: true,
        status: true,
      },
    });
  }

  async findPolyclinicCounter(currentDate: string, keyword: string) {
    try {
      const results: PolyclinicCounter[] = await this.prismaService.$queryRaw<
        PolyclinicCounter[]
      >(
        Prisma.sql`
          SELECT
              unit.id,
              unit.nama_unit_kerja,
              unit.kode_instalasi_bpjs,
              COUNT(a.kode_instalasi_bpjs) AS total_antrean,
              COUNT(b.kode_instalasi_bpjs) AS total_antrean_selesai
          FROM
              db_unit_kerja AS unit
          LEFT JOIN (
              SELECT
                  jadwal.id_jadwal_dokter,
                  jadwal.kode_instalasi_bpjs
              FROM db_jadwal_dokter AS jadwal
              LEFT JOIN (
                  SELECT
                      antrian.created_at,
                      antrian.id_jadwal_dokter,
                      antrian.is_deleted
                  FROM db_antrian AS antrian
                  WHERE
                      antrian.created_at LIKE CONCAT(${currentDate}, '%')
                      AND antrian.is_deleted = 0
                      AND antrian.status != 2
              ) antrian ON jadwal.id_jadwal_dokter = antrian.id_jadwal_dokter
          ) a ON unit.kode_instalasi_bpjs = a.kode_instalasi_bpjs
          LEFT JOIN (
                  SELECT
                      jadwal.id_jadwal_dokter,
                      jadwal.kode_instalasi_bpjs
                  FROM db_jadwal_dokter AS jadwal
                  LEFT JOIN (
                      SELECT
                          antrian.id_jadwal_dokter,
                          antrian.created_at,
                          antrian.status,
                          antrian.is_deleted
                      FROM db_antrian AS antrian
                      WHERE
                          antrian.status = 1
                        AND
                          antrian.created_at LIKE CONCAT(${currentDate}, '%')
                        AND antrian.is_deleted = 0
                  ) antrian ON jadwal.id_jadwal_dokter = antrian.id_jadwal_dokter
                  WHERE antrian.status = true AND antrian.is_deleted = 0
          ) b ON unit.kode_instalasi_bpjs = b.kode_instalasi_bpjs
          WHERE
              (unit.jenis_pelayanan = 1 OR unit.jenis_pelayanan = 2)
              AND unit.nama_unit_kerja LIKE CONCAT('%', ${keyword}, '%')
              AND unit.is_deleted = 0
          GROUP BY
              unit.id,
              unit.nama_unit_kerja,
              unit.kode_instalasi_bpjs
          ORDER BY unit.id DESC
          `,
      );

      return results.map((item) => ({
        ...item,
        id: Number(item.id),
        total_antrean: Number(item.total_antrean),
        total_antrean_selesai: Number(item.total_antrean_selesai),
      }));
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createWorkUnit(workUnit: WorkUnit) {
    try {
      return await this.prismaService.workUnit.create({
        data: {
          ...workUnit,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateWorkUnit(id: number, workUnit: WorkUnit) {
    try {
      return await this.prismaService.workUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: {
          ...workUnit,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusWorkUnit(id: number, workUnit: UpdateStatus) {
    try {
      return await this.prismaService.workUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: workUnit,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateQueueStatus(id: number, workUnit: WorkUnitUpdateQueueStatus) {
    try {
      return await this.prismaService.workUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: workUnit,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteWorkUnit(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.workUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
