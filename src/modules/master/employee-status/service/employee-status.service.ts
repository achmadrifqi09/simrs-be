import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EmployeeStatusRepository } from '../repository/employee-status.repository.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([EmployeeStatusRepository])
@Injectable()
export class EmployeeStatusService {
  constructor(
    private readonly employeeStatusRepository: EmployeeStatusRepository,
  ) {}

  async findAllEmployeeStatus(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.employeeStatusRepository.findAllEmployeeStatus(
      keyword ?? '',
      status,
    );
  }

  async createEmployeeStatus(employeeStatus: EmployeeStatusDTO, req: any) {
    employeeStatus = {
      nama_status_pegawai: employeeStatus.nama_status_pegawai,
      status: isNaN(Number(employeeStatus.status))
        ? 1
        : Number(employeeStatus.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.employeeStatusRepository.createEmployeeStatus(employeeStatus);
  }

  async updateEmployeeStatus(
    id: number,
    employeeStatus: EmployeeStatusDTO,
    req: any,
  ) {
    employeeStatus = {
      nama_status_pegawai: employeeStatus.nama_status_pegawai,
      status: isNaN(Number(employeeStatus.status))
        ? 1
        : Number(employeeStatus.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.employeeStatusRepository.updateVisibilityEmployeeStatus(
      id,
      employeeStatus,
    );
  }

  async updateVisibilityEmployeeStatus(
    id: number,
    employeeStatus: UpdateStatus,
    req: any,
  ) {
    const payload: UpdateStatus = {
      status: Number(employeeStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.employeeStatusRepository.updateEmployeeStatus(id, payload);
  }

  async softDeleteEmployeeStatus(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.employeeStatusRepository.softDeleteEmployeeStatus(
      id,
      deletePayload,
    );
  }
}
