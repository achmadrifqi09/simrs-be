import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReligionPayloadDTO } from '../dto/religion.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class ReligionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllReligion(keyword?: string, status?: number) {
    const whereClause: Prisma.ReligionWhereInput = {
      OR: [{ nama_agama: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id_ms_agama: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.religion.findMany({
      where: whereClause,
      orderBy: {
        id_ms_agama: 'desc',
      },
    });
  }

  async updateStatusReligion(id: number, religion: UpdateStatus) {
    try {
      return await this.prismaService.religion.update({
        where: {
          id_ms_agama: Number(id),
          is_deleted: false,
        },
        data: religion,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createReligion(religion: ReligionPayloadDTO) {
    try {
      return await this.prismaService.religion.create({
        data: religion,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteReligion(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.religion.update({
        where: {
          id_ms_agama: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateReligion(id: number, payload: ReligionPayloadDTO) {
    try {
      return await this.prismaService.religion.update({
        where: {
          id_ms_agama: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
