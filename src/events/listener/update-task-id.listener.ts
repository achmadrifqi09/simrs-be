import { Dependencies, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskIdService } from 'src/modules/bpjs/service/task-id.service';
import { UpdateTaskIdEvent } from '../event/update-task-id.event';

@Dependencies([TaskIdService])
@Injectable()
export class UpdateTaskIdListener {
  constructor(private readonly taskIdService: TaskIdService) {}

  @OnEvent('bpjs.task-id-update')
  async createRegistrationWhenQueueIsPresent(payload: UpdateTaskIdEvent) {
    await this.taskIdService.firstUpdateTaskId(
      payload.payload,
      payload.isNewPatient,
    );
  }
}
