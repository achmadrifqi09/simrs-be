import { Dependencies, Injectable } from '@nestjs/common';
import { RegistrationService } from '../../registration/service/registration.service';
import { OnEvent } from '@nestjs/event-emitter';
import { QueueEvent } from '../event/queue.event';

@Dependencies([RegistrationService])
@Injectable()
export class QueueListener {
  constructor(private readonly registrationService: RegistrationService) {}

  @OnEvent('queue.attendance')
  async createRegistrationWhenQueueIsPresent(payload: QueueEvent) {
    await this.registrationService.createRegistrationFromQueue(payload.queue);
  }
}
