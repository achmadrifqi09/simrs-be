import { Module } from '@nestjs/common';
import { QueueService } from './service/queue.service';
import { QueueController } from './controller/queue.controller';
import { DoctorScheduleModule } from '../doctor-schedule/doctor-schedule.module';
import { QueueRepository } from './repository/queue.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { QueueServiceHelper } from './helper/queue-service.helper';

@Module({
  imports: [DoctorScheduleModule, PrismaModule],
  controllers: [QueueController],
  providers: [QueueService, QueueRepository, QueueServiceHelper],
})
export class QueueModule {}
