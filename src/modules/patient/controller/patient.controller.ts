import {
  Body,
  Controller,
  Delete,
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
import { PatientService } from '../service/patient.service';
import { Public } from '../../../decorators/public/public.decorator';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import { updateVisibilityBed } from '../../master/bed/validation/bed.validation';
import { UpdateStatus } from '../../../common/types/common.type';
import { PatientDTO } from '../dto/patient.dto';
import { newPatientQueueValidation } from '../../queue/validation/queue.validation';
import { patientValidation } from '../validation/patient.validation';

@Controller({
  path: '/patient',
  version: '1',
})
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Public()
  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBed(
    @Query('keyword') keyword: string,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.patientService.findAllPatient(keyword, cursor, take);
  }

  @Public()
  @Get('/:identifier_number')
  async findPatientById(
    @Param('identifier_number') identifier_number: number | string,
    @Query('identifier_type') identifier_type: number,
  ) {
    return this.patientService.findFirstPatient(
      identifier_number,
      identifier_type,
    );
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('data-pasien', Action.CAN_UPDATE)
  async updatePatient(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(patientValidation))
    patient: PatientDTO,
  ) {
    return this.patientService.updatePatient(id, patient, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('data-pasien', Action.CAN_DELETE)
  async softDeleteBed(@Param('id') id: number, @Req() req: any) {
    return this.patientService.softDeletePatient(id, req);
  }
}
