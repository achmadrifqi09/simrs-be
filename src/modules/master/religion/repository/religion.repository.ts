import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReligionPayloadDTO } from '../dto/religion.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class ReligionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllReligion(keyword?: string) {
    return this.prismaService.religion.findMany({
      where: {
        nama_agama: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async updateStatusReligion(id: number, religion: StatusUpdateDTO) {
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
      return this.prismaService.religion.create({
        data: religion,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteReligion(id: number, payload: SoftDeleteDTO) {
    try {
      return this.prismaService.religion.update({
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
