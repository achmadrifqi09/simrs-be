import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { BloodTypePayloadDTO } from '../dto/blood-type.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class BloodTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createBloodType(bloodType: BloodTypePayloadDTO) {
    try {
      return await this.prismaService.bloodType.create({
        data: bloodType,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateBloodType(id: number, bloodType: BloodTypePayloadDTO) {
    try {
      return await this.prismaService.bloodType.update({
        where: {
          id_ms_golongan_darah: Number(id),
          is_deleted: false,
        },
        data: bloodType,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusBloodType(id: number, bloodType: UpdateStatus) {
    try {
      return await this.prismaService.bloodType.update({
        where: {
          id_ms_golongan_darah: Number(id),
          is_deleted: false,
        },
        data: bloodType,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findAllBloodType(keyword?: string, status?: number) {
    const whereClause: Prisma.BloodTypeWhereInput = {
      OR: [{ nama_golongan_darah: { contains: keyword } }],
      is_deleted: false,
    };

    if (Number(keyword))
      whereClause.OR.push({ id_ms_golongan_darah: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.bloodType.findMany({
      where: whereClause,
      orderBy: {
        id_ms_golongan_darah: 'desc',
      },
    });
  }

  async bloodTypeSoftDelete(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.bloodType.update({
        where: {
          id_ms_golongan_darah: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
