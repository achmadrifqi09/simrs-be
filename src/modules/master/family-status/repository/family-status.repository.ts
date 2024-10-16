import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { FamilyStatusPayloadDTO } from '../dto/family-status.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class FamilyStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllFamilyStatus(keyword?: string) {
    return this.prismaService.familyStatus.findMany({
      where: {
        nama_status_keluarga: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async findAllByStatus(status: number) {
    return this.prismaService.familyStatus.findMany({
      where: {
        status: status,
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

  async updateFamilyStatus(id: number, payload: FamilyStatusPayloadDTO) {
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
