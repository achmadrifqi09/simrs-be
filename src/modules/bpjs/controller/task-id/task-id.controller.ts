import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TaskIdService } from '../../service/task-id.service';
import { ZodPipe } from 'src/pipes/zod-pipe/zod-pipe.pipe';
import { updateTaskIdValidation } from '../../validation/task-id-update.validation';
import { TaskIdDto } from '../../dto/queue/task-id.dto';

@Controller({
  path: '/bpjs/task-id',
  version: '1',
})
export class TaskIdController {
  constructor(private readonly bpjsTaskIdService: TaskIdService) {}

  @Get('/:booking_code/internal')
  async findInternalTaskId(@Param('booking_code') bookingCode: string) {
    return this.bpjsTaskIdService.findInternalTaskId(bookingCode);
  }

  @Get('/:booking_code')
  async findBPJSTaskId(@Param('booking_code') bookingCode: string) {
    return this.bpjsTaskIdService.findBPJSTaskId(bookingCode);
  }

  @Patch('/registration/:id')
  async updateTaskId(
    @Param('id') id: number,
    @Body(new ZodPipe(updateTaskIdValidation)) taskId: TaskIdDto,
  ) {
    return this.bpjsTaskIdService.updateTaskIdFromClient(taskId, id);
  }
}
