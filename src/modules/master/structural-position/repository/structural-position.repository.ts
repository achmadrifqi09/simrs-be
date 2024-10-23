import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { StructuralPositionPayloadDTO } from '../dto/structural-position.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class StructuralPositionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllStructuralPosition(keyword: string, status?: number) {
    const whereClause: Prisma.PositionWhereInput = {
      OR: [{ nama_jabatan: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_jabatan: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.position.findMany({
      where: whereClause,
      orderBy: {
        id_ms_jabatan: 'desc',
      },
    });
  }

  async createStructuralPosition(
    structuralPosition: StructuralPositionPayloadDTO,
  ) {
    try {
      return await this.prismaService.position.create({
        data: structuralPosition,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStructuralPosition(
    id: number,
    payload: StructuralPositionPayloadDTO,
  ) {
    try {
      return await this.prismaService.position.update({
        where: {
          id_ms_jabatan: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusStructuralPosition(
    id: number,
    structuralPosition: UpdateStatus,
  ) {
    try {
      return await this.prismaService.position.update({
        where: {
          id_ms_jabatan: Number(id),
          is_deleted: false,
        },
        data: structuralPosition,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteStructuralPosition(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.position.update({
        where: {
          id_ms_jabatan: Number(id),
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
