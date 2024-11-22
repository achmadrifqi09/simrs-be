import { Dependencies, Injectable } from '@nestjs/common';
import { QueueService } from '../../queue/service/queue.service';
import { generateCurrentDateWithCustomHour } from '../../../utils/date-formatter';

@Dependencies([QueueService])
@Injectable()
export class RegistrationService {
  constructor(private readonly queueService: QueueService) {}

  async findAllOnsiteRegistration(
    keyword?: string,
    cursor: number = 0,
    take: number = 10,
    guarantorType?: number,
  ) {
    const fromDate = generateCurrentDateWithCustomHour('00:00:00')
      .toISOString()
      .split('T')[0];
    const toDate = generateCurrentDateWithCustomHour('23:59:00')
      .toISOString()
      .split('T')[0];
    return this.queueService.findAllQueue(
      keyword,
      fromDate,
      toDate,
      cursor,
      take,
      guarantorType,
    );
  }
}
