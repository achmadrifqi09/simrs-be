import { Dependencies, Injectable } from '@nestjs/common';
import { RegistrationService } from '../../modules/registration/service/registration.service';
import { OnEvent } from '@nestjs/event-emitter';
import { RegisterWhenPatientPresentEvent } from '../event/register-when-patient-present.event';

@Dependencies([RegistrationService])
@Injectable()
export class QueueListener {
  constructor(private readonly registrationService: RegistrationService) {}

  @OnEvent('queue.attendance')
  async createRegistrationWhenQueueIsPresent(
    payload: RegisterWhenPatientPresentEvent,
  ) {
    await this.registrationService.createRegistrationFromQueue(payload.queue);
  }
}
