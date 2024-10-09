import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RankOfEmployeesPayloadDTO } from '../dto/employee-rank.dto';

@Dependencies([PrismaService])
@Injectable()
export class RankOfEmployeesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRankOfEmployees(keyword?: string) {
    return this.prismaService.rankOfEmployees.findMany({
      where: {
        nama_pangkat: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async updateStatusRankOfEmployees(
    id: number,
    rankOfEmployees: StatusUpdateDTO,
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

  async createRankOfEmployees(rankOfEmployees: RankOfEmployeesPayloadDTO) {
    try {
      return await this.prismaService.rankOfEmployees.create({
        data: rankOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteRankOfEmployees(id: number, payload: SoftDeleteDTO) {
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
