import {
  Post,
  HttpCode,
  HttpStatus,
  Header,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BPJSQueueService } from './../../service/queue.service';
import { Controller } from '@nestjs/common';
import { ZodPipe } from 'src/pipes/zod-pipe/zod-pipe.pipe';
import { bpjsQueueAddValidation } from '../../validation/queue-add.validation';
import { BPJSQueueInputPayloadDto } from '../../dto/queue/queue.dto';
import { AccessMenuGuard } from 'src/guards/access-menu/access-menu.guard';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Action } from 'src/common/enums/action.enum';

@Controller({
  path: '/bpjs/queue',
  version: '1',
})
export class QueueController {
  constructor(private readonly bpjsQueueService: BPJSQueueService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('pendaftaran-onsite', Action.CAN_CREATE)
  async createNewPatientOnsiteQueue(
    @Body(new ZodPipe(bpjsQueueAddValidation))
    queuePayload: BPJSQueueInputPayloadDto,
  ) {
    return this.bpjsQueueService.queueAdd(queuePayload);
  }
}
