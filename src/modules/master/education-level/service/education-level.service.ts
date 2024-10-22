import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EducationLevelRepository } from '../repository/education-level.repository';
import { EducationLevelPayloadDTO } from '../dto/education-level.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { SoftDelete, UpdateStatus } from 'src/common/types/common.type';

@Dependencies([EducationLevelRepository])
@Injectable()
export class EducationLevelService {
  constructor(
    private readonly educationLevelRepository: EducationLevelRepository,
  ) {}

  async findAllEducationLevel(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.educationLevelRepository.findAllEducationLevel(
      keyword ?? '',
      status,
    );
  }

  async createEducationLevel(
    educationLevel: EducationLevelPayloadDTO,
    req: any,
  ) {
    educationLevel = {
      ...educationLevel,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.educationLevelRepository.createEducationLevel(educationLevel);
  }

  async updateEducationLevel(
    id: number,
    educationLevel: EducationLevelPayloadDTO,
    req: any,
  ) {
    const payload: EducationLevelPayloadDTO = {
      nama_tingkat_pendidikan: educationLevel.nama_tingkat_pendidikan,
      status: Number(educationLevel.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.educationLevelRepository.updateEducationLevel(id, payload);
  }

  async updateVisibilityEducationLevel(
    id: number,
    educationLevel: UpdateStatus,
    req: any,
  ) {
    const payload: UpdateStatus = {
      status: Number(educationLevel.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.educationLevelRepository.updateVisibilityEducationLevel(
      id,
      payload,
    );
  }

  async educationLevelSoftDelete(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.educationLevelRepository.softDeleteEducationLevel(
      id,
      deletePayload,
    );
  }
}
