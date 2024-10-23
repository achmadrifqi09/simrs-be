import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { MaritalStatusPayloadDTO } from '../dto/marital-status.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class MaritalStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllMaritalStatus(keyword?: string, status?: number) {
    const whereClause: Prisma.MaritalStatusWhereInput = {
      OR: [{ nama_status_kawin: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_status_kawin: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.maritalStatus.findMany({
      where: whereClause,
      orderBy: {
        id_ms_status_kawin: 'desc',
      },
    });
  }

  async createMaritalStatus(maritalStatus: MaritalStatusPayloadDTO) {
    try {
      return await this.prismaService.maritalStatus.create({
        data: maritalStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateMaritalStatus(id: number, payload: MaritalStatusPayloadDTO) {
    try {
      return await this.prismaService.maritalStatus.update({
        where: {
          id_ms_status_kawin: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilityMaritalStatus(id: number, religion: UpdateStatus) {
    try {
      return await this.prismaService.maritalStatus.update({
        where: {
          id_ms_status_kawin: Number(id),
          is_deleted: false,
        },
        data: religion,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteMaritalStatus(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.maritalStatus.update({
        where: {
          id_ms_status_kawin: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
