import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { QueueService } from '../service/queue.service';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import { Public } from '../../../decorators/public/public.decorator';
import {
  newPatientQueueValidation,
  oldPatientQueueValidation,
} from '../validation/queue.validation';
import { PatientQueue } from '../dto/queue.dto';

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
  ) {
    return this.queueService.findAllQueue(
      keyword,
      fromDate,
      toDate,
      cursor,
      take,
      guarantorType,
    );
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
