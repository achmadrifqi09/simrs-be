import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';

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
      nama: {
        contains: keyword,
      },
      is_deleted: false,
    };

    if (countryId) {
      whereClause.id_negara = countryId;
    }

    const result = await this.prismaService.province.findMany({
      take: Number(take),
      skip: Number(cursor) ?? undefined,
      where: whereClause,
      orderBy: {
        id: 'asc',
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
}
