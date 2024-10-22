import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { TypeOfEmployeesPayloadDTO } from '../dto/employee-type.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Injectable()
export class TypeOfEmployeesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTypeOfEmployees(
    keyword?: string,
    status?: number,
    employeeTypeId?: number,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.TypeOfEmployeesWhereInput = {
      is_deleted: false,
      nama_jenis_pegawai: {
        contains: keyword,
      },
    };

    if (Number(keyword))
      whereClause.OR = [{ id_ms_jenis_pegawai: Number(keyword) }];

    if (status) {
      whereClause.status = Number(status);
    }

    if (employeeTypeId) {
      whereClause.id_ms_jenis_pegawai = Number(employeeTypeId);
    }

    return this.prismaService.typeOfEmployees.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      orderBy: {
        id_ms_jenis_pegawai: 'desc',
      },
    });
  }

  async createTypeOfEmployees(typeOfEmployees: TypeOfEmployeesPayloadDTO) {
    try {
      return await this.prismaService.typeOfEmployees.create({
        data: typeOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateTypeOfEmployees(
    id: number,
    typeOfEmployees: TypeOfEmployeesPayloadDTO,
  ) {
    try {
      return await this.prismaService.typeOfEmployees.update({
        where: {
          id_ms_jenis_pegawai: Number(id),
          is_deleted: false,
        },
        data: typeOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusTypeOfEmployees(id: number, typeOfEmployees: UpdateStatus) {
    try {
      return await this.prismaService.typeOfEmployees.update({
        where: {
          id_ms_jenis_pegawai: Number(id),
          is_deleted: false,
        },
        data: typeOfEmployees,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateTypeOfEmployeesAvailability(id: number, isAvailable: boolean) {
    try {
      return await this.prismaService.typeOfEmployees.update({
        where: {
          id_ms_jenis_pegawai: Number(id),
          is_deleted: false,
        },
        data: {
          status: +isAvailable,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteTypeOfEmployees(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.typeOfEmployees.update({
        where: {
          id_ms_jenis_pegawai: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
