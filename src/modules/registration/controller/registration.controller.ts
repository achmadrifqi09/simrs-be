import { Controller, Get, Param, Query } from '@nestjs/common';
import { RegistrationService } from '../service/registration.service';

@Controller({
  path: 'registration',
  version: '1',
})
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get()
  async findAllOnsiteRegistrations(
    @Query('keyword') keyword: string,
    @Query('id_unit') idUnit: number,
    @Query('id_doctor') idDoctor: number,
    @Query('patient_type') patientType: number,
    @Query('guarantor_type') guarantorType: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.registrationService.findAllTodayRegistration(
      keyword,
      idUnit,
      idDoctor,
      patientType,
      guarantorType,
      cursor,
      take,
    );
  }

  @Get('/:id')
  async findRegistrationById(@Param('id') id: number) {
    return this.registrationService.findRegistrationById(id);
  }
}
