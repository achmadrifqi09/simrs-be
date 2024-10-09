import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';

@Dependencies([PrismaService])
@Injectable()
export class SpecialistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllSpecialist(keyword?: string) {
    return this.prismaService.specialist.findMany({
      where: {
        nama_spesialis: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async updateStatusSpecialist(id: number, specialist: StatusUpdateDTO) {
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

  async softDeleteSpecialist(id: number, payload: SoftDeleteDTO) {
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
