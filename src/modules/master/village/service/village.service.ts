import { Dependencies, Injectable } from '@nestjs/common';
import { VillageRepository } from '../repository/village.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { VillagePayloadDTO } from '../dto/village.dto';
import { SoftDelete } from '../../../../common/types/common.type';

@Dependencies([VillageRepository])
@Injectable()
export class VillageService {
  constructor(private readonly villageRepository: VillageRepository) {}

  async findAllVillage(
    keyword?: string,
    districtId?: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.villageRepository.findAllVillage(
      keyword || '',
      districtId || '',
      cursor,
      take,
    );
  }

  async createVillage(village: VillagePayloadDTO, req: any) {
    village = {
      ...village,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.villageRepository.createVillage(village);
  }

  async updateVillage(
    id: number | string,
    village: VillagePayloadDTO,
    req: any,
  ) {
    const payload: VillagePayloadDTO = {
      ...village,
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.villageRepository.updateVillage(id.toString(), payload);
  }

  async villageSoftDelete(id: string | number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.villageRepository.villageSoftDelete(
      id.toString(),
      deletePayload,
    );
  }
}
