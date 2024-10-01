import { Dependencies, Injectable } from '@nestjs/common';
import { ReligionRepository } from '../repository/religion.repository';
import { ReligionDTO, ReligionPayloadDTO } from '../dto/religio.dto';

@Dependencies([ReligionRepository])
@Injectable()
export class ReligionService {
  constructor(private readonly religionRepository: ReligionRepository) {}

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
      created_by: req.user?.id,
      nama_agama: religion.nama_agama,
      status: isNaN(Number(religion.status)) ? 1 : Number(religion.status),
    };
    return this.religionRepository.createReligion(religion);
  }
}
