import { QueueDto } from '../dto/queue.dto';

export class QueueEvent {
  constructor(public readonly queue: QueueDto) {}
}
