import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FieldOfWorkUnit } from '../type/field-of-work-unit.type';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { SoftDelete, UpdateStatus } from '../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class FieldOfWorkUnitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFieldOfWorkUnit(keyword: string, status?: number) {
    const whereClause: Prisma.FieldOfWorkUnitWhereInput = {
      OR: [{ nama_bidang: { contains: keyword } }],
      is_deleted: false,
    };

    if (Number(status)) whereClause.OR.push({ status: Number(keyword) });
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });

    return this.prismaService.fieldOfWorkUnit.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createFieldOfWorkUnit(field: FieldOfWorkUnit) {
    try {
      return await this.prismaService.fieldOfWorkUnit.create({
        data: field,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateFieldOfWorkUnit(id: number, field: FieldOfWorkUnit) {
    try {
      return await this.prismaService.fieldOfWorkUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: field,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateFieldOfWorkUnitStatus(id: number, field: UpdateStatus) {
    try {
      return await this.prismaService.fieldOfWorkUnit.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: field,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteFieldOfWorkUnit(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.fieldOfWorkUnit.update({
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
