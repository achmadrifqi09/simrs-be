import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TypeOfStatusOfficerRepository } from '../repository/employee-category.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { TypeOfStatusOfficerPayloadDTO } from '../dto/employee-category.dto';

@Dependencies([TypeOfStatusOfficerRepository])
@Injectable()
export class TypeOfStatusOfficerService {
  constructor(
    private readonly typeOfStatusOfficerRepository: TypeOfStatusOfficerRepository,
  ) {}

  async findAllTypeOfStatusOfficer(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.typeOfStatusOfficerRepository.findAllTypeOfStatusOfficer(
      keyword ?? '',
      status,
    );
  }

  async createTypeOfStatusOfficer(
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
    req: any,
  ) {
    typeOfStatusOfficer = {
      status_jenis_pegawai: typeOfStatusOfficer.status_jenis_pegawai,
      status: isNaN(Number(typeOfStatusOfficer.status))
        ? 1
        : Number(typeOfStatusOfficer.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.typeOfStatusOfficerRepository.createTypeOfStatusOfficer(
      typeOfStatusOfficer,
    );
  }

  async softDeleteTypeOfStatusOfficer(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.typeOfStatusOfficerRepository.softDeleteTypeOfStatusOfficer(
      id,
      deletePayload,
    );
  }

  async updateTypeOfStatusOfficer(
    id: number,
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
    req: any,
  ) {
    typeOfStatusOfficer = {
      status_jenis_pegawai: typeOfStatusOfficer.status_jenis_pegawai,
      status: isNaN(Number(typeOfStatusOfficer.status))
        ? 1
        : Number(typeOfStatusOfficer.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.typeOfStatusOfficerRepository.updateTypeOfStatusOfficer(
      id,
      typeOfStatusOfficer,
    );
  }

  async updateStatusTypeOfStatusOfficer(
    id: number,
    typeOfStatusOfficer: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(typeOfStatusOfficer.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.typeOfStatusOfficerRepository.updateStatusTypeOfStatusOfficer(
      id,
      payload,
    );
  }
}
