import { PrismaService } from '../../../prisma/prisma.service';
import { Dependencies } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WorkUnit, WorkUnitUpdateQueueStatus } from '../type/work-unit.type';
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

  async findParentWorkUnit(keyword: string){
    const whereClause: Prisma.WorkUnitWhereInput = {
      OR: [{ nama_unit_kerja: { contains: keyword } }],
      id_unit_induk: null,
      status: 1,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    return this.prismaService.workUnit.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }
  async findAllWorkUnit(
    isParentUnit: boolean,
    field_id?: number,
    keyword?: string,
    serviceType?: number,
    workUnitId?: number,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.WorkUnitWhereInput = {
      is_deleted: false,
      OR: [{ nama_unit_kerja: { contains: keyword } }],
      is_parent_unit: isParentUnit,
    };

    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });

    if (serviceType) {
      whereClause.jenis_pelayanan = Number(serviceType);
    }

    if (workUnitId) {
      whereClause.id_unit_induk = Number(workUnitId);
    }

    if (Number(field_id)) whereClause.id_unit_induk = Number(field_id);

    return this.prismaService.workUnit.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
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

  async createWorkUnit(workUnit: WorkUnit) {
    try {
      return await this.prismaService.workUnit.create({
        data: {
          ...workUnit,
          is_parent_unit: workUnit.is_parent_unit == 1,
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
          is_parent_unit: workUnit.is_parent_unit == 1,
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
