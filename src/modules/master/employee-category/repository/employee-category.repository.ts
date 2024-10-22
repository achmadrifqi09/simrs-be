import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { TypeOfStatusOfficerPayloadDTO } from '../dto/employee-category.dto';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class TypeOfStatusOfficerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTypeOfStatusOfficer(keyword?: string, status?: number) {
    const whereClause: Prisma.TypeOfStatusOfficerWhereInput = {
      OR: [{ status_jenis_pegawai: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_jenis_pegawai_status: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.typeOfStatusOfficer.findMany({
      where: whereClause,
      orderBy: {
        id_ms_jenis_pegawai_status: 'desc',
      },
    });
  }

  async updateStatusTypeOfStatusOfficer(
    id: number,
    typeOfStatusOfficer: UpdateStatus,
  ) {
    try {
      return await this.prismaService.typeOfStatusOfficer.update({
        where: {
          id_ms_jenis_pegawai_status: Number(id),
          is_deleted: false,
        },
        data: typeOfStatusOfficer,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createTypeOfStatusOfficer(
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
  ) {
    try {
      return await this.prismaService.typeOfStatusOfficer.create({
        data: typeOfStatusOfficer,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteTypeOfStatusOfficer(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.typeOfStatusOfficer.update({
        where: {
          id_ms_jenis_pegawai_status: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateTypeOfStatusOfficer(
    id: number,
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
  ) {
    try {
      return await this.prismaService.typeOfStatusOfficer.update({
        where: {
          id_ms_jenis_pegawai_status: Number(id),
          is_deleted: false,
        },
        data: typeOfStatusOfficer,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
