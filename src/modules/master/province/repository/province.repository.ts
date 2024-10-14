import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { ProvincePayloadDTO } from '../dto/province.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class ProvinceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProvince(
    keyword?: string,
    countryId?: number | null,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.ProvinceWhereInput = {
      OR: [{ nama: { contains: keyword } }, { id: { contains: keyword } }],
      is_deleted: false,
    };

    if (countryId) {
      whereClause.id_negara = countryId;
    }

    const result = await this.prismaService.province.findMany({
      take: Number(take),
      skip: Number(cursor) ?? undefined,
      where: whereClause,
      select: {
        id: true,
        id_negara: true,
        nama: true,
        ms_negara: {
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

  async findById(id: string) {
    try {
      return await this.prismaService.province.findFirst({
        where: {
          id: id,
          is_deleted: false,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createProvince(province: ProvincePayloadDTO) {
    try {
      return await this.prismaService.province.create({
        data: province,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateProvince(id: string, province: ProvincePayloadDTO) {
    try {
      return await this.prismaService.province.update({
        where: {
          id: id,
          is_deleted: false,
        },
        data: province,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async provinceSoftDelete(id: string, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.province.update({
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
