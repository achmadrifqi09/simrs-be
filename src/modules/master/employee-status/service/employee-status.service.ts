import { Dependencies, Injectable } from '@nestjs/common';
import { EmployeeStatusRepository } from '../repository/employee-status.repository.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([EmployeeStatusRepository])
@Injectable()
export class EmployeeStatusService {
  constructor(
    private readonly employeeStatusRepository: EmployeeStatusRepository,
  ) {}

  async findAllEmployeeStatus(keyword?: string) {
    return this.employeeStatusRepository.findAllEmployeeStatus(keyword || '');
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
    employeeStatus: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(employeeStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.employeeStatusRepository.updateEmployeeStatus(id, payload);
  }

  async softDeleteEmployeeStatus(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
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
