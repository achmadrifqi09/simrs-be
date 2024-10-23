import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { BuildingPayloadDTO } from '../dto/building.dto';

@Dependencies([PrismaService])
@Injectable()
export class BuildingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllBuilding(keyword?: string, status?: number) {
    const whereClause: Prisma.BuildingWhereInput = {
      OR: [{ nama_gedung: { contains: keyword } }],
      is_deleted: false,
    };

    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.building.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createBuilding(building: BuildingPayloadDTO) {
    try {
      return await this.prismaService.building.create({
        data: building,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateBuilding(id: number, building: BuildingPayloadDTO) {
    try {
      return await this.prismaService.building.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: building,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusBuilding(id: number, building: UpdateStatus) {
    try {
      return await this.prismaService.building.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: building,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteBuilding(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.building.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
