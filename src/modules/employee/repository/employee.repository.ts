import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  UpdateCodeDpjp,
  UpdateFileFoto,
  UpdateFileKk,
  UpdateFileKtam,
  UpdateFileKtp,
  UpdateFileNpwp,
} from '../dto/employee.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import {
  SoftDelete,
  UpdateStatusEmployee,
} from '../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findEmployee(keyword: string, cursor: number, take: number) {
    const whereClause: Prisma.EmployeeWhereInput = {
      OR: [{ nama_pegawai: { contains: keyword } }],
      is_deleted: false,
    };

    const result = await this.prismaService.employee.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      orderBy: {
        id_pegawai: 'desc',
      },
    });

    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
  }

  async findDoctor(keyword: string, cursor: number, take: number) {
    const whereClause: Prisma.EmployeeWhereInput = {
      OR: [{ nama_pegawai: { contains: keyword } }],
      is_deleted: false,
      id_ms_jenis_pegawai: 1,
    };

    const result = await this.prismaService.employee.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      orderBy: {
        id_pegawai: 'desc',
      },
      include: {
        nama_jenis_pegawai: {
          include: {
            jenis_pegawai_status: true,
          },
        },
      },
    });

    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
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
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          hp: true,
          email: true,
          // negara_asal: {
          //   select: {
          //     nama: true,
          //   }
          // }
        },
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

  async updateCodeDpjp(id_pegawai: number, employee: UpdateCodeDpjp) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: employee,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          kode_dpjp: true,
        },
      });
    } catch (error) {
      console.log(error);
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilityEmployee(
    id_pegawai: number,
    employee: UpdateStatusEmployee,
  ) {
    try {
      return await this.prismaService.employee.update({
        where: {
          id_pegawai: Number(id_pegawai),
          is_deleted: false,
        },
        data: employee,
        select: {
          id_pegawai: true,
          nama_pegawai: true,
          status_aktif: true,
        },
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
