import { Controller, Dependencies, Get, Header, Query } from '@nestjs/common';
import { ProvinceService } from '../service/province.service';

@Dependencies([ProvinceService])
@Controller('/api/v1/master/province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllProvince(
    @Query('keyword') keyword: string,
    @Query('countryId') countryId: number,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.provinceService.findAllProvince(keyword, countryId, skip, take);
  }
}
