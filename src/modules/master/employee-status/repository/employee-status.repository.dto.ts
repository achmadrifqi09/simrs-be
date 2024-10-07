import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class EmployeeStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllEmployeeStatus(keyword: string) {
    return this.prismaService.employeeStatus.findMany({
      where: {
        nama_status_pegawai: {
          contains: keyword,
        },
        is_deleted: false,
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

  async updateEmployeeStatus(id: number, payload: StatusUpdateDTO) {
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
    employeeStatus: StatusUpdateDTO,
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

  async softDeleteEmployeeStatus(id: number, payload: SoftDeleteDTO) {
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
