import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { MaritalStatusPayloadDTO } from '../dto/marital-status.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class MaritalStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllMaritalStatus(keyword?: string) {
    return this.prismaService.maritalStatus.findMany({
      where: {
        nama_status_kawin: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async createMaritalStatus(maritalStatus: MaritalStatusPayloadDTO) {
    try {
      return this.prismaService.maritalStatus.create({
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

  async updateVisibilityMaritalStatus(id: number, religion: StatusUpdateDTO) {
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

  async softDeleteMaritalStatus(id: number, payload: SoftDeleteDTO) {
    try {
      return this.prismaService.maritalStatus.update({
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
