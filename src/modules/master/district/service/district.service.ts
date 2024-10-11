import { Dependencies, Injectable } from '@nestjs/common';
import { DistrictRepository } from '../repository/district.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { DistrictPayloadDTO } from '../dto/district.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([DistrictRepository])
@Injectable()
export class DistrictService {
  constructor(private readonly districtRepository: DistrictRepository) {}

  async findAllDistrict(
    keyword?: string,
    regencyId?: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.districtRepository.findAllDistrict(
      keyword || '',
      regencyId || '',
      cursor,
      take,
    );
  }

  async createDistrict(district: DistrictPayloadDTO, req: any) {
    district = {
      ...district,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.districtRepository.createDistrict(district);
  }

  async updateDistrict(
    id: number | string,
    district: DistrictPayloadDTO,
    req: any,
  ) {
    const payload: DistrictPayloadDTO = {
      ...district,
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.districtRepository.updateDistrict(id.toString(), payload);
  }

  async districtSoftDelete(id: string | number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.districtRepository.districtSoftDelete(
      id.toString(),
      deletePayload,
    );
  }
}
