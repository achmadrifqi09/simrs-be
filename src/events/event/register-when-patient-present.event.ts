import { QueueDto } from '../../modules/queue/dto/queue.dto';

export class RegisterWhenPatientPresentEvent {
  constructor(public readonly queue: QueueDto) {}
}
