import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { InsuranceDto } from '../dto/insurance.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class InsuranceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllInsurance(keyword?: string, status?: number) {
    const whereClause: Prisma.InsuranceWhereInput = {
      OR: [{ nama_asuransi: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.insurance.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createInsurance(insurance: InsuranceDto) {
    try {
      return await this.prismaService.insurance.create({
        data: insurance,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateInsurance(id: number, payload: InsuranceDto) {
    try {
      return await this.prismaService.insurance.update({
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

  async updateStatusInsurance(id: number, payload: UpdateStatus) {
    try {
      return await this.prismaService.insurance.update({
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

  async softDeleteInsurance(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.insurance.update({
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
