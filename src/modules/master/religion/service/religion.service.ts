import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ReligionRepository } from '../repository/religion.repository';
import { ReligionPayloadDTO } from '../dto/religion.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([ReligionRepository])
@Injectable()
export class ReligionService {
  constructor(private readonly religionRepository: ReligionRepository) {}

  async finAllReligion(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.religionRepository.findAllReligion(keyword ?? '', status);
  }

  async createReligion(religion: ReligionPayloadDTO, req: any) {
    religion = {
      nama_agama: religion.nama_agama,
      status: isNaN(Number(religion.status)) ? 1 : Number(religion.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.religionRepository.createReligion(religion);
  }

  async softDeleteReligion(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.religionRepository.softDeleteReligion(id, deletePayload);
  }

  async updateReligion(id: number, religion: ReligionPayloadDTO, req: any) {
    religion = {
      nama_agama: religion.nama_agama,
      status: isNaN(Number(religion.status)) ? 1 : Number(religion.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.religionRepository.updateReligion(id, religion);
  }

  async updateStatusReligion(id: number, religion: StatusUpdateDTO, req: any) {
    const payload: StatusUpdateDTO = {
      status: Number(religion.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.religionRepository.updateStatusReligion(id, payload);
  }
}
