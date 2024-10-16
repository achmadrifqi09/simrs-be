import { Dependencies, Injectable } from '@nestjs/common';
import { SocialStatusRepository } from '../repository/social-status.repository';
import { SocialStatusPayloadDTO } from '../dto/social-status.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { SoftDeleteDTO, StatusUpdateDTO } from 'src/common/dto/common.dto';

@Dependencies([SocialStatusRepository])
@Injectable()
export class SocialStatusService {
  constructor(
    private readonly socialStatusRepository: SocialStatusRepository,
  ) {}

  async findAllSocialStatus(keyword?: string, status?: number) {
    if (status) {
      return this.socialStatusRepository.findAllByStatus(Number(status));
    }
    return this.socialStatusRepository.findAllSocialStatus(keyword || '');
  }

  async createSocialStatus(socialStatus: SocialStatusPayloadDTO, req: any) {
    socialStatus = {
      ...socialStatus,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.socialStatusRepository.createSocialStatus(socialStatus);
  }

  async updateSocialStatus(
    id: number,
    socialStatus: SocialStatusPayloadDTO,
    req: any,
  ) {
    const payload: SocialStatusPayloadDTO = {
      nama_status_sosial: socialStatus.nama_status_sosial,
      status: Number(socialStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.socialStatusRepository.updateSocialStatus(id, payload);
  }

  async updateVisibilitySocialStatus(
    id: number,
    socialStatus: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(socialStatus.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.socialStatusRepository.updateVisibilitySocialStatus(
      id,
      payload,
    );
  }

  async socialStatusSoftDelete(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.socialStatusRepository.softDeleteSocialStatus(
      id,
      deletePayload,
    );
  }
}
