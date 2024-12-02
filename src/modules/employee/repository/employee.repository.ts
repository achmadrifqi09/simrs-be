import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  UpdateFileFoto,
  UpdateFileKk,
  UpdateFileKtam,
  UpdateFileKtp,
  UpdateFileNpwp,
} from '../dto/employee.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { SoftDelete } from '../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findEmployee(keyword: string) {
    const whereClause: Prisma.EmployeeWhereInput = {
      OR: [{ nama_pegawai: { contains: keyword } }],
      is_deleted: false,
    };

    if (Number(keyword)) whereClause.OR.push({ id_pegawai: Number(keyword) });

    return this.prismaService.employee.findMany({
      where: whereClause,
      orderBy: {
        id_pegawai: 'desc',
      },
    });
  }

  async findEmployeeById(id: number) {
    const whereClause: Prisma.EmployeeWhereInput = {
      id_pegawai: Number(id),
      is_deleted: false,
    };

    return this.prismaService.employee.findFirst({
      where: whereClause,
    });
  }

  async createEmployee(field: Prisma.EmployeeCreateInput) {
    try {
      return await this.prismaService.employee.create({
        data: field,
        // select: {
        //   negara_asal: {
        //     select: {
        //       nama: true,
        //     }
        //   }
        // }
      });
    } catch (error) {
      console.log(error);
      PrismaErrorHandler.handle(error);
    }
  }

  async updateEmployee(id_pegawai: number, field: Prisma.EmployeeUpdateInput) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: field,
      });
    } catch (error) {
      console.log(error);
      PrismaErrorHandler.handle(error);
    }
  }

  async updateEmployeePhoto(id_pegawai: number, field: UpdateFileFoto) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          // is_deleted: false,
        },
        data: field,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          foto: true,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
      throw new Error('Failed to update employee photo');
    }
  }

  async updateEmployeeKtp(id_pegawai: number, field: UpdateFileKtp) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: field,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          file_ktp: true,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
      throw new Error('Failed to update employee photo');
    }
  }

  async updateEmployeeKk(id_pegawai: number, field: UpdateFileKk) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: field,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          file_kk: true,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
      throw new Error('Failed to update employee photo');
    }
  }

  async updateEmployeeKtam(id_pegawai: number, field: UpdateFileKtam) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: field,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          file_ktam: true,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
      throw new Error('Failed to update employee photo');
    }
  }

  async updateEmployeeNpwp(id_pegawai: number, field: UpdateFileNpwp) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: field,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          file_npwp: true,
        },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
      throw new Error('Failed to update employee photo');
    }
  }

  async softDeleteEmployee(id_pegawai: number, payload: SoftDelete) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
