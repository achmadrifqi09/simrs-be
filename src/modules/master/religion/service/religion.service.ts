import { Dependencies, Injectable } from '@nestjs/common';
import { ReligionRepository } from '../repository/religion.repository';
import {
  ReligionDTO,
  ReligionPayloadDTO,
  ReligionSoftDeleteDTO,
} from '../dto/religion.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';

@Dependencies([ReligionRepository])
@Injectable()
export class ReligionService {
  constructor(private readonly religionRepository: ReligionRepository) {
  }

  async finAllReligion(keyword?: string) {
    const result = await this.religionRepository.findAllReligion(keyword || '');

    const religions: ReligionDTO[] = result.map((religion) => ({
      id_ms_agama: religion.id_ms_agama,
      nama_agama: religion.nama_agama,
      status: religion.status,
    }));

    return religions;
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
    const deletePayload: ReligionSoftDeleteDTO = {
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
}
