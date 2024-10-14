import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { VillagePayloadDTO } from '../dto/village.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class VillageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllVillage(
    keyword?: string,
    districtId?: string,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.VillageWhereInput = {
      OR: [{ nama: { contains: keyword } }, { id: { contains: keyword } }],
      is_deleted: false,
    };

    if (districtId) {
      whereClause.id_kecamatan = districtId;
    }

    const result = await this.prismaService.village.findMany({
      take: Number(take),
      skip: Number(cursor) ?? undefined,
      where: whereClause,
      select: {
        id: true,
        id_kecamatan: true,
        nama: true,
        ms_kecamatan: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take),
      },
    };
  }

  async createVillage(village: VillagePayloadDTO) {
    try {
      return await this.prismaService.village.create({
        data: village,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVillage(id: string, village: VillagePayloadDTO) {
    try {
      return await this.prismaService.village.update({
        where: {
          id: id,
          is_deleted: false,
        },
        data: village,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async villageSoftDelete(id: string, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.village.update({
        where: {
          id: id,
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
