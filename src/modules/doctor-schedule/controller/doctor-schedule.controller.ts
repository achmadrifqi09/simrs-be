import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorScheduleService } from '../service/doctor-schedule.service';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  doctorScheduleValidation,
  doctorVacationValidation,
} from '../validation/doctor-schedule.validation';
import { DoctorScheduleDTO, DoctorVacation } from '../dto/doctor-schedule.dto';

@Controller('doctor-schedule')
export class DoctorScheduleController {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findDoctorSchedule(
    @Query('poly_code') poly_code: string,
    @Query('practice_date') practice_date: string,
    @Query('doctor_id') doctor_id: number,
    @Query('keyword') keyword: string,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.doctorScheduleService.findDoctorSchedule(
      poly_code,
      practice_date,
      doctor_id,
      keyword,
      cursor,
      take,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('penjadwalan-dokter', Action.CAN_CREATE)
  async createDoctorSchedule(
    @Req() req: any,
    @Body(new ZodPipe(doctorScheduleValidation)) schedule: DoctorScheduleDTO,
  ) {
    return this.doctorScheduleService.createDoctorSchedule(schedule, req);
  }

  @Patch('/:id/vacation')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('dokter-praktek', Action.CAN_UPDATE)
  async updateDoctorVacation(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(doctorVacationValidation)) payload: DoctorVacation,
  ) {
    return this.doctorScheduleService.doctorVacation(id, payload, req);
  }

  @Patch('/:id/cancel-vacation')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('dokter-praktek', Action.CAN_UPDATE)
  async cancelDoctorVacation(@Param('id') id: number, @Req() req: any) {
    return this.doctorScheduleService.cancelDoctorVacation(id, req);
  }
}
