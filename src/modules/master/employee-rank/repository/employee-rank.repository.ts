import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RankOfEmployeesPayloadDTO } from '../dto/employee-rank.dto';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class RankOfEmployeesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRankOfEmployees(keyword?: string, status?: number) {
    const whereClause: Prisma.RankOfEmployeesWhereInput = {
      OR: [{ nama_pangkat: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_pangkat: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.rankOfEmployees.findMany({
      where: whereClause,
      orderBy: {
        id_ms_pangkat: 'desc',
      },
    });
  }

  async updateStatusRankOfEmployees(id: number, rankOfEmployees: UpdateStatus) {
    try {
      return await this.prismaService.rankOfEmployees.update({
        where: {
          id_ms_pangkat: Number(id),
          is_deleted: false,
        },
        data: rankOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createRankOfEmployees(rankOfEmployees: RankOfEmployeesPayloadDTO) {
    try {
      return await this.prismaService.rankOfEmployees.create({
        data: rankOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteRankOfEmployees(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.rankOfEmployees.update({
        where: {
          id_ms_pangkat: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateRankOfEmployees(
    id: number,
    rankOfEmployees: RankOfEmployeesPayloadDTO,
  ) {
    try {
      return await this.prismaService.rankOfEmployees.update({
        where: {
          id_ms_pangkat: Number(id),
          is_deleted: false,
        },
        data: rankOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
