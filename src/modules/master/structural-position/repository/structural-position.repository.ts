import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PositionPayloadDTO } from '../dto/structural-position.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class StructuralPositionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllStructuralPosition(keyword: string) {
    return this.prismaService.position.findMany({
      where: {
        nama_jabatan: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async createStructuralPosition(structuralPosition: PositionPayloadDTO) {
    try {
      return await this.prismaService.position.create({
        data: structuralPosition,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStructuralPosition(id: number, payload: PositionPayloadDTO) {
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
    structuralPosition: StatusUpdateDTO,
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

  async softDeleteStructuralPosition(id: number, payload: SoftDeleteDTO) {
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
