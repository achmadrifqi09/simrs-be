import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { DistrictPayloadDTO } from '../dto/district.dto';
import { SoftDelete } from '../../../../common/types/common.type';

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
      OR: [{ nama: { contains: keyword } }, { id: { contains: keyword } }],
      is_deleted: false,
    };

    if (regencyId) {
      whereClause.id_kabkot = regencyId;
    }

    const result = await this.prismaService.district.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
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
        take: Number(take) || 10,
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

  async districtSoftDelete(id: string, payload: SoftDelete) {
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
