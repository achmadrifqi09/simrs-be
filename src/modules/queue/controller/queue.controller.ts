import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { QueueService } from '../service/queue.service';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import { Public } from '../../../decorators/public/public.decorator';
import { newPatientQueueValidation } from '../validation/queue.validation';
import { NewPatientPayload } from '../dto/queue.dto';

@Controller({
  path: 'queue',
  version: '1',
})
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('/new-patient')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createDoctorSchedule(
    @Body(new ZodPipe(newPatientQueueValidation))
    queue: NewPatientPayload,
  ) {
    return this.queueService.createNewPatientOnsiteQueue(queue);
  }
}
