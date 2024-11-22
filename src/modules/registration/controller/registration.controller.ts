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
    @Query('guarantor_type') guarantorType: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.onsiteRegistrationService.findAllOnsiteRegistration(
      keyword,
      cursor,
      take,
      guarantorType,
    );
  }
}
