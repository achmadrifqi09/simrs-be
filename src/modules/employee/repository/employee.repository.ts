import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Employee, Prisma } from '@prisma/client';
import { z } from 'zod';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: z.infer<typeof CreateEmployeeDto>) {
    // return this.prisma.employee.create({
    //   data,
    // });
  }

  async getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({
      where: { id_pegawai: id },
    });
  }

  async getAllEmployees(filter: Prisma.EmployeeWhereInput = {}) {
    return this.prisma.employee.findMany({
      where: filter,
    });
  }

  async updateEmployee(
    id: number,
    updateData: Partial<Employee>,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: updateData,
    });
  }

  async findById(id: number): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { id_pegawai: id },
    });
  }

  async softDeleteEmployee(id: number) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async restoreEmployee(id: number) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { is_deleted: false, restored_at: new Date() },
    });
  }

  async deleteEmployeePermanently(id: number) {
    return this.prisma.employee.delete({
      where: { id_pegawai: id },
    });
  }

  async saveKtpFile(id: number, filename: string) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { file_ktp: filename },
    });
  }

  async saveKkFile(id: number, filename: string) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { file_kk: filename },
    });
  }

  async saveKtamFile(id: number, filename: string) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { file_ktam: filename },
    });
  }

  async saveNpwpFile(id: number, filename: string) {
    return this.prisma.employee.update({
      where: { id_pegawai: id },
      data: { file_npwp: filename },
    });
  }
}
