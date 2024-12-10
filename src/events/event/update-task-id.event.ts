import { FirstUpdateTaskIdDto } from 'src/modules/bpjs/dto/queue/task-id.dto';

export class UpdateTaskIdEvent {
  constructor(
    public readonly payload: FirstUpdateTaskIdDto,
    public readonly isNewPatient: boolean,
  ) {}
}
