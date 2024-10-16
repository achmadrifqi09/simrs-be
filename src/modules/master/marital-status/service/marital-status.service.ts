import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MaritalStatusRepository } from '../repository/marital-status.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { MaritalStatusPayloadDTO } from '../dto/marital-status.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([MaritalStatusRepository])
@Injectable()
export class MaritalStatusService {
  constructor(
    private readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}

  async findAllMaritalStatus(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.maritalStatusRepository.findAllMaritalStatus(
      keyword ?? '',
      status,
    );
  }

  async createMaritalStatus(maritalStatus: MaritalStatusPayloadDTO, req: any) {
    maritalStatus = {
      nama_status_kawin: maritalStatus.nama_status_kawin,
      status: isNaN(Number(maritalStatus.status))
        ? 1
        : Number(maritalStatus.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.maritalStatusRepository.createMaritalStatus(maritalStatus);
  }

  async updateMartialStatus(
    id: number,
    maritalStatus: MaritalStatusPayloadDTO,
    req: any,
  ) {
    maritalStatus = {
      nama_status_kawin: maritalStatus.nama_status_kawin,
      status: isNaN(Number(maritalStatus.status))
        ? 1
        : Number(maritalStatus.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.maritalStatusRepository.updateMaritalStatus(id, maritalStatus);
  }

  async updateVisibilityMaritalStatus(
    id: number,
    maritalStatus: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(maritalStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.maritalStatusRepository.updateVisibilityMaritalStatus(
      id,
      payload,
    );
  }

  async softDeleteMaritalStatus(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.maritalStatusRepository.softDeleteMaritalStatus(
      id,
      deletePayload,
    );
  }
}
