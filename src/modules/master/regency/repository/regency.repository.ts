import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RegencyPayloadDTO } from '../dto/regency.dto';
import { Prisma } from '@prisma/client';
import { ProvincePayloadDTO } from '../../province/dto/province.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class RegencyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRegency(
    keyword?: string,
    provinceId?: string,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.RegencyWhereInput = {
      nama: {
        contains: keyword,
      },
      is_deleted: false,
    };

    if (provinceId) {
      whereClause.id_provinsi = provinceId;
    }

    const result = await this.prismaService.regency.findMany({
      take: Number(take),
      skip: Number(cursor) ?? undefined,
      where: whereClause,
      select: {
        id: true,
        id_provinsi: true,
        nama: true,
        ms_provinsi: {
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

  async createRegency(regency: RegencyPayloadDTO) {
    try {
      return await this.prismaService.regency.create({
        data: regency,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateRegency(id: string, regency: RegencyPayloadDTO) {
    try {
      return await this.prismaService.regency.update({
        where: {
          id: id,
          is_deleted: false,
        },
        data: regency,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async regencySoftDelete(id: string, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.regency.update({
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
