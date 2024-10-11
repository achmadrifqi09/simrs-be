import { Dependencies, Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../repository/province.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { ProvincePayloadDTO } from '../dto/province.dto';
import { SoftDeleteDTO } from '../../../../common/dto/common.dto';

@Dependencies([ProvinceRepository])
@Injectable()
export class ProvinceService {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async findAllProvince(
    keyword?: string,
    countryId?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.provinceRepository.findAllProvince(
      keyword || '',
      countryId || null,
      cursor,
      take,
    );
  }

  async createProvince(province: ProvincePayloadDTO, req: any) {
    province = {
      ...province,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.provinceRepository.createProvince(province);
  }

  async updateProvince(
    id: number | string,
    province: ProvincePayloadDTO,
    req: any,
  ) {
    const payload: ProvincePayloadDTO = {
      ...province,
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.provinceRepository.updateProvince(id.toString(), payload);
  }

  async provinceSoftDelete(id: string | number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.provinceRepository.provinceSoftDelete(
      id.toString(),
      deletePayload,
    );
  }
}
