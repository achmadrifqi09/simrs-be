import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { DistrictPayloadDTO } from '../dto/district.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class DistrictRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllDistrict(
    keyword?: string,
    regencyId?: string,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.DistrictWhereInput = {
      nama: {
        contains: keyword,
      },
      is_deleted: false,
    };

    if (regencyId) {
      whereClause.id_kabkot = regencyId;
    }

    const result = await this.prismaService.district.findMany({
      take: Number(take),
      skip: Number(cursor) ?? undefined,
      where: whereClause,
      select: {
        id: true,
        id_kabkot: true,
        nama: true,
        ms_kabkot: {
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

  async createDistrict(district: DistrictPayloadDTO) {
    try {
      return await this.prismaService.district.create({
        data: district,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateDistrict(id: string, district: DistrictPayloadDTO) {
    try {
      return await this.prismaService.district.update({
        where: {
          id: id,
          is_deleted: false,
        },
        data: district,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async districtSoftDelete(id: string, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.district.update({
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
