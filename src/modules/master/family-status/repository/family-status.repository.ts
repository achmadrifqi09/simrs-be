import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { FamilyStatusPayloadDTO } from '../dto/family-status.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class FamilyStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllFamilyStatus(keyword?: string, status?: number) {
    const whereClause: Prisma.FamilyStatusWhereInput = {
      nama_status_keluarga: {
        contains: keyword,
      },
      is_deleted: false,
    };

    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }
    return this.prismaService.familyStatus.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createFamilyStatus(familyStatus: FamilyStatusPayloadDTO) {
    try {
      return await this.prismaService.familyStatus.create({
        data: familyStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateFamilyStatus(id: number, familyStatus: FamilyStatusPayloadDTO) {
    try {
      return await this.prismaService.familyStatus.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: familyStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilityFamilyStatus(
    id: number,
    familyStatus: StatusUpdateDTO,
  ) {
    try {
      return await this.prismaService.familyStatus.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: familyStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteFamilyStatus(id: number, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.familyStatus.update({
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
