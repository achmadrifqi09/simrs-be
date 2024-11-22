import { Controller, Get, Query } from '@nestjs/common';
import { RegistrationService } from '../service/registration.service';

@Controller({
  path: 'registration',
  version: '1',
})
export class RegistrationController {
  constructor(
    private readonly onsiteRegistrationService: RegistrationService,
  ) {}

  @Get()
  async findAllOnsiteRegistrations(
    @Query('keyword') keyword: string,
    @Query('id_unit') idUnit: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.onsiteRegistrationService.findAllTodayRegistration(
      keyword,
      idUnit,
      cursor,
      take,
    );
  }
}
