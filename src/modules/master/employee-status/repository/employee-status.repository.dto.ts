import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class EmployeeStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllEmployeeStatus(keyword: string, status?: number) {
    const whereClause: Prisma.EmployeeStatusWhereInput = {
      OR: [{ nama_status_pegawai: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_status_pegawai: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.employeeStatus.findMany({
      where: whereClause,
      orderBy: {
        id_ms_status_pegawai: 'desc',
      },
    });
  }

  async createEmployeeStatus(employeeStatus: EmployeeStatusDTO) {
    try {
      return await this.prismaService.employeeStatus.create({
        data: employeeStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateEmployeeStatus(id: number, payload: UpdateStatus) {
    try {
      return await this.prismaService.employeeStatus.update({
        where: {
          id_ms_status_pegawai: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilityEmployeeStatus(
    id: number,
    employeeStatus: UpdateStatus,
  ) {
    try {
      return await this.prismaService.employeeStatus.update({
        where: {
          id_ms_status_pegawai: Number(id),
          is_deleted: false,
        },
        data: employeeStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteEmployeeStatus(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.employeeStatus.update({
        where: {
          id_ms_status_pegawai: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
