import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from '../service/registration.service';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  cancellationValidation,
  registrationValidation,
} from '../validation/registration.validation';
import {
  CancellationStatusPayload,
  RegistrationUpdateDto,
} from '../dto/registration.dto';

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

  @Patch('/:id/cancellation')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('pendaftaran-onsite', Action.CAN_UPDATE)
  async updateCancellationStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(cancellationValidation))
    payload: CancellationStatusPayload,
  ) {
    return this.registrationService.updateCancellationStatus(id, payload, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('pendaftaran-onsite', Action.CAN_UPDATE)
  async updateRegistration(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(registrationValidation))
    payload: RegistrationUpdateDto,
  ) {
    return this.registrationService.updateRegisration(id, payload, req);
  }
}
