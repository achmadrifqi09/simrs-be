import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReligionPayloadDTO, ReligionSoftDeleteDTO } from '../dto/religion.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';

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

  async createReligion(religion: ReligionPayloadDTO) {
    return this.prismaService.religion.create({
      data: religion,
    });
  }

  async softDeleteReligion(id: number, payload: ReligionSoftDeleteDTO) {
    try {
      return this.prismaService.religion.update({
        where: {
          id_ms_agama: Number(id),
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
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
