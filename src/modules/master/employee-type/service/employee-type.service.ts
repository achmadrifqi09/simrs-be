import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TypeOfEmployeesRepository } from '../repository/employee-type.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { TypeOfEmployeesPayloadDTO } from '../dto/employee-type.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([TypeOfEmployeesRepository])
@Injectable()
export class TypeOfEmployeesService {
  constructor(
    private readonly typeOfEmployeesRepository: TypeOfEmployeesRepository,
  ) {}

  async findAllTypeOfEmployees(
    keyword?: string,
    status?: number,
    employeeTypeId?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.typeOfEmployeesRepository.findAllTypeOfEmployees(
      keyword ?? '',
      status,
      employeeTypeId,
      cursor,
      take,
    );
  }

  async createTypeOfEmployees(
    typeOfEmployees: TypeOfEmployeesPayloadDTO,
    req: any,
  ) {
    const payload: TypeOfEmployeesPayloadDTO = {
      nama_jenis_pegawai: typeOfEmployees.nama_jenis_pegawai,
      id_ms_jenis_pegawai_status: Number(
        typeOfEmployees.id_ms_jenis_pegawai_status,
      ),
      status: isNaN(Number(typeOfEmployees.status))
        ? 1
        : Number(typeOfEmployees.status),
      created_by: req.user?.id,
    };
    return this.typeOfEmployeesRepository.createTypeOfEmployees(payload);
  }

  async updateTypeOfEmployees(
    id: number,
    typeOfEmployees: TypeOfEmployeesPayloadDTO,
    req: any,
  ) {
    const payload: TypeOfEmployeesPayloadDTO = {
      nama_jenis_pegawai: typeOfEmployees.nama_jenis_pegawai,
      id_ms_jenis_pegawai_status: Number(
        typeOfEmployees.id_ms_jenis_pegawai_status,
      ),
      status: isNaN(Number(typeOfEmployees.status))
        ? 1
        : Number(typeOfEmployees.status),
      modified_by: req.user?.id,
    };
    return this.typeOfEmployeesRepository.updateTypeOfEmployees(id, payload);
  }

  async updateStatusTypeOfEmployees(
    id: number,
    typeOfEmployees: UpdateStatus,
    req: any,
  ) {
    const payload: UpdateStatus = {
      status: Number(typeOfEmployees.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.typeOfEmployeesRepository.updateStatusTypeOfEmployees(
      id,
      payload,
    );
  }

  async softDeleteTypeOfEmployees(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.typeOfEmployeesRepository.softDeleteTypeOfEmployees(
      id,
      deletePayload,
    );
  }
}
