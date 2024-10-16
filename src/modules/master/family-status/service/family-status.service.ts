import { Dependencies, Injectable } from '@nestjs/common';
import { FamilyStatusRepository } from '../repository/family-status.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { FamilyStatusPayloadDTO } from '../dto/family-status.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([FamilyStatusRepository])
@Injectable()
export class FamilyStatusService {
  constructor(
    private readonly familyStatusRepository: FamilyStatusRepository,
  ) {}

  async findAllFamilyStatus(keyword?: string, status?: number) {
    if (status) {
      return this.familyStatusRepository.findAllByStatus(Number(status));
    }
    return this.familyStatusRepository.findAllFamilyStatus(keyword || '');
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
    familyStatus: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
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
    const deletePayload: SoftDeleteDTO = {
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
