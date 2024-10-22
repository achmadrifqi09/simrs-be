import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class SpecialistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllSpecialist(keyword?: string, status?: number) {
    const whereClause: Prisma.SpecialistWhereInput = {
      OR: [{ nama_spesialis: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_spesialis: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.specialist.findMany({
      where: whereClause,
      orderBy: {
        id_ms_spesialis: 'desc',
      },
    });
  }

  async updateStatusSpecialist(id: number, specialist: UpdateStatus) {
    try {
      return await this.prismaService.specialist.update({
        where: {
          id_ms_spesialis: Number(id),
          is_deleted: false,
        },
        data: specialist,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createSpecialist(specialist: SpecialistPayloadDTO) {
    try {
      return await this.prismaService.specialist.create({
        data: specialist,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteSpecialist(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.specialist.update({
        where: {
          id_ms_spesialis: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateSpecialist(id: number, specialist: SpecialistPayloadDTO) {
    try {
      return await this.prismaService.specialist.update({
        where: {
          id_ms_spesialis: Number(id),
          is_deleted: false,
        },
        data: specialist,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
