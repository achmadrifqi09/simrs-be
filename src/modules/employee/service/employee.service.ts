import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { z } from 'zod';
import { CreateEmployeeDto } from '../dto/employee.dto';
import { Employee } from '@prisma/client';
// import path from 'path';
// import fs from 'fs';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(data: z.infer<typeof CreateEmployeeDto>) {
    // return this.employeeRepository.createEmployee(data);
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async getAllEmployees() {
    return this.employeeRepository.getAllEmployees();
  }

  async updateEmployee() {
    // await this.getEmployeeById(id);
    // return this.employeeRepository.updateEmployee(id, data);
  }

  async softDeleteEmployee(id: number) {
    await this.getEmployeeById(id);
    return this.employeeRepository.softDeleteEmployee(id);
  }

  async restoreEmployee(id: number) {
    await this.getEmployeeById(id);
    return this.employeeRepository.restoreEmployee(id);
  }

  async deleteEmployeePermanently(id: number) {
    await this.getEmployeeById(id);
    return this.employeeRepository.deleteEmployeePermanently(id);
  }

  async updateEmployeeFilename(
    id: number,
    filename: string,
  ) {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // delete jika ada file lama
    // if (employee.file_ktp) {
    //   const oldFilePath = path.join(
    //     process.cwd(),
    //     'storage/ktp',
    //     employee.file_ktp,
    //   );
    //   try {
    //     await fs.promises.unlink(oldFilePath);
    //   } catch (error) {
    //     console.warn(`Old file not found: ${oldFilePath}`);
    //   }
    // }

    // return this.employeeRepository.updateEmployee(id, { file_ktp: filename });
  }

  // async uploadFileKtp(id: number, filename: string) {
  //   await this.getEmployeeById(id);
  //   return this.employeeRepository.saveKtpFile(id, filename);
  // }

  // async uploadFileKk(id: number, filename: string) {
  //   await this.getEmployeeById(id);
  //   return this.employeeRepository.saveKkFile(id, filename);
  // }

  // async uploadFileKtam(id: number, filename: string) {
  //   await this.getEmployeeById(id);
  //   return this.employeeRepository.saveKtamFile(id, filename);
  // }

  // async uploadFileNpwp(id: number, filename: string) {
  //   await this.getEmployeeById(id);
  //   return this.employeeRepository.saveNpwpFile(id, filename);
  // }
}
