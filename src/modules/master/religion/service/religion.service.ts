import { Dependencies, Injectable } from '@nestjs/common';
import { ReligionRepository } from '../repository/religion.repository';
import { ReligionDTO } from '../dto/religio.dto';

@Dependencies([ReligionRepository])
@Injectable()
export class ReligionService {
  constructor(private readonly religionRepository: ReligionRepository) {}

  async createReligion(religion: ReligionDTO, req: any) {
    religion = {
      created_by: req.user?.id,
      ...religion,
    };
    return this.religionRepository.createReligion(religion);
  }
}
