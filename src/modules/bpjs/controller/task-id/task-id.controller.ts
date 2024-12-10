import { Controller, Get, Param } from '@nestjs/common';
import { TaskIdService } from '../../service/task-id.service';

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
}
