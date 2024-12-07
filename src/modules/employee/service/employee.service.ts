import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { Employee, UpdateCodeDpjp } from '../dto/employee.dto';
import { SoftDelete } from '../../../common/types/common.type';

@Dependencies([EmployeeRepository])
@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async findEmployee(keyword?: string, cursor: number = 0, take: number = 10) {
    return this.employeeRepository.findEmployee(keyword || '', cursor, take);
  }
  
  async findDoctor(keyword?: string, cursor: number = 0, take: number = 10) {
    return this.employeeRepository.findDoctor(keyword || '', cursor, take);
  }

  async findEmployeeById(id: number) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Employee tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return employee;
    // return this.employeeRepository.findEmployeeById(id);
  }

  async createEmployee(
    employee: Employee,
    files: {
      foto?: Express.Multer.File[];
      file_ktp?: Express.Multer.File[];
      file_kk?: Express.Multer.File[];
      file_ktam?: Express.Multer.File[];
      file_npwp?: Express.Multer.File[];
    },
    req: any,
  ) {
    employee = {
      ...employee,
      no_reg: Array.from({ length: 10 }, () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return chars.charAt(Math.floor(Math.random() * chars.length));
      }).join(''),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.employeeRepository.createEmployee(employee);
  }

  async updateEmployee(id: number, employee: Employee, req: any) {
    employee = {
      ...employee,
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.employeeRepository.updateEmployee(id, employee);
  }

  async updateCodeDpjp(id: number, employee: UpdateCodeDpjp, req: any) {
    employee = {
      ...employee,
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.employeeRepository.updateCodeDpjp(id, employee);
  }

  async updateEmployeePhoto(id: number, file: string | null, req: any) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Karyawan tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      const updatePhoto = {
        foto: file,
        created_by: req.user?.id,
        created_at: generateCurrentDate(),
      };
      return this.employeeRepository.updateEmployeePhoto(id, updatePhoto);
    } else {
      throw new HttpException(
        'Tidak ada file yang diunggah atau file tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateEmployeeKtp(id: number, file: string | null, req: any) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Karyawan tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      const updateFile = {
        file_ktp: file,
        created_by: req.user?.id,
        created_at: generateCurrentDate(),
      };
      return this.employeeRepository.updateEmployeeKtp(id, updateFile);
    } else {
      throw new HttpException(
        'Tidak ada file yang diunggah atau file tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateEmployeeKk(id: number, file: string | null, req: any) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Karyawan tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      const updateFile = {
        file_kk: file,
        created_by: req.user?.id,
        created_at: generateCurrentDate(),
      };
      return this.employeeRepository.updateEmployeeKk(id, updateFile);
    } else {
      throw new HttpException(
        'Tidak ada file yang diunggah atau file tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateEmployeeKtam(id: number, file: string | null, req: any) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Karyawan tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      const updateFile = {
        file_ktam: file,
        created_by: req.user?.id,
        created_at: generateCurrentDate(),
      };
      return this.employeeRepository.updateEmployeeKtam(id, updateFile);
    } else {
      throw new HttpException(
        'Tidak ada file yang diunggah atau file tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateEmployeeNpwp(id: number, file: string | null, req: any) {
    const employee = await this.employeeRepository.findEmployeeById(id);
    if (!employee) {
      throw new HttpException(
        'ID Karyawan tidak ditemukan.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      const updateFile = {
        file_npwp: file,
        created_by: req.user?.id,
        created_at: generateCurrentDate(),
      };
      return this.employeeRepository.updateEmployeeNpwp(id, updateFile);
    } else {
      throw new HttpException(
        'Tidak ada file yang diunggah atau file tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDeleteEmployee(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.employeeRepository.softDeleteEmployee(id, deletePayload);
  }
}
