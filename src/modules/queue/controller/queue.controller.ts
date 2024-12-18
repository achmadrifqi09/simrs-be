import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from '../service/queue.service';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import { Public } from '../../../decorators/public/public.decorator';
import {
  newPatientQueueValidation,
  oldPatientQueueValidation,
  updateQueueDoctorSchedule,
} from '../validation/queue.validation';
import { PatientQueue, UpdateQueueDoctorSchedule } from '../dto/queue.dto';
import { AccessMenuGuard } from 'src/guards/access-menu/access-menu.guard';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Action } from 'src/common/enums/action.enum';

@Controller({
  path: 'queue',
  version: '1',
})
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllQueue(
    @Query('keyword') keyword: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
    @Query('guarantor_type') guarantorType: number,
    @Query('patient_type') patientType: number,
  ) {
    return this.queueService.findAllQueue(
      keyword,
      fromDate,
      toDate,
      cursor,
      take,
      guarantorType,
      patientType,
    );
  }

  @Get('/QUID/:id')
  @Header('Content-Type', 'application/json')
  async findQueueById(@Param('id') id: number) {
    return this.queueService.findQueueById(id);
  }

  @Public()
  @Get('/:identifier_code')
  @Header('Content-Type', 'application/json')
  async findTodayQueueByIdentifierCode(
    @Param('identifier_code') identifierCode: string,
    @Query('identifier_type') identifierType: number,
  ) {
    if (identifierType && ![1, 2, 3, 4].includes(Number(identifierType))) {
      throw new HttpException(
        'Jenis nomor tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.queueService.findTodayQueueByIdentifierCode(
      identifierCode,
      identifierType,
    );
  }

  @Post('/new-patient')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createNewPatientOnsiteQueue(
    @Body(new ZodPipe(newPatientQueueValidation))
    queue: PatientQueue,
  ) {
    return this.queueService.createNewPatientOnsiteQueue(queue);
  }

  @Patch('/:id/doctor-schedule')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('panggil-antrean', Action.CAN_UPDATE)
  async updateDoctorSchedule(
    @Param('id') id: number,
    @Body(new ZodPipe(updateQueueDoctorSchedule))
    payload: UpdateQueueDoctorSchedule,
    @Req() req: any,
  ) {
    return this.queueService.updateQueueDoctorSchedule(id, payload, req);
  }

  @Post('/old-patient')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createOldPatientOnsiteQueue(
    @Body(new ZodPipe(oldPatientQueueValidation))
    queue: PatientQueue,
  ) {
    return this.queueService.createOldPatientOnsiteQueue(queue);
  }
}
