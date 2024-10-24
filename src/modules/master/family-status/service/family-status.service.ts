import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FamilyStatusRepository } from '../repository/family-status.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { FamilyStatusPayloadDTO } from '../dto/family-status.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([FamilyStatusRepository])
@Injectable()
export class FamilyStatusService {
  constructor(
    private readonly familyStatusRepository: FamilyStatusRepository,
  ) {}

  async findAllFamilyStatus(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.familyStatusRepository.findAllFamilyStatus(
      keyword ?? '',
      status,
    );
  }

  async createFamilyStatus(familyStatus: FamilyStatusPayloadDTO, req: any) {
    familyStatus = {
      ...familyStatus,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.familyStatusRepository.createFamilyStatus(familyStatus);
  }

  async updateFamilyStatus(
    id: number,
    familyStatus: FamilyStatusPayloadDTO,
    req: any,
  ) {
    const payload: FamilyStatusPayloadDTO = {
      nama_status_keluarga: familyStatus.nama_status_keluarga,
      status: Number(familyStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.familyStatusRepository.updateFamilyStatus(id, payload);
  }

  async updateVisibilityFamilyStatus(
    id: number,
    familyStatus: UpdateStatus,
    req: any,
  ) {
    const payload: UpdateStatus = {
      status: Number(familyStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.familyStatusRepository.updateVisibilityFamilyStatus(
      id,
      payload,
    );
  }

  async familyStatusSoftDelete(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.familyStatusRepository.softDeleteFamilyStatus(
      id,
      deletePayload,
    );
  }
}
