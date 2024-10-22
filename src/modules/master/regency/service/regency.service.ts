import { Dependencies, Injectable } from '@nestjs/common';
import { RegencyRepository } from '../repository/regency.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { RegencyPayloadDTO } from '../dto/regency.dto';
import { SoftDelete } from '../../../../common/types/common.type';

@Dependencies([RegencyRepository])
@Injectable()
export class RegencyService {
  constructor(private readonly regencyRepository: RegencyRepository) {}

  async findAllRegency(
    keyword?: string,
    provinceId?: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.regencyRepository.findAllRegency(
      keyword || '',
      provinceId || '',
      cursor,
      take,
    );
  }

  async createRegency(regency: RegencyPayloadDTO, req: any) {
    regency = {
      ...regency,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.regencyRepository.createRegency(regency);
  }

  async updateRegency(
    id: number | string,
    regency: RegencyPayloadDTO,
    req: any,
  ) {
    const payload: RegencyPayloadDTO = {
      ...regency,
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.regencyRepository.updateRegency(id.toString(), payload);
  }

  async regencySoftDelete(id: string | number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.regencyRepository.regencySoftDelete(
      id.toString(),
      deletePayload,
    );
  }
}
