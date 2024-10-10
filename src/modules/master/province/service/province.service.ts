import { Dependencies, Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../repository/province.repository';

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
}
