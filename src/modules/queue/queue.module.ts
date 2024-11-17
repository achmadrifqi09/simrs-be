import { Module } from '@nestjs/common';
import { QueueService } from './service/queue.service';
import { QueueController } from './controller/queue.controller';
import { DoctorScheduleModule } from '../doctor-schedule/doctor-schedule.module';
import { QueueRepository } from './repository/queue.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { QueueServiceHelper } from './helper/queue-service.helper';
import { BPJSModule } from '../bpjs/bpjs.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [DoctorScheduleModule, PrismaModule, BPJSModule, PatientModule],
  controllers: [QueueController],
  providers: [QueueService, QueueRepository, QueueServiceHelper],
  exports: [QueueService],
})
export class QueueModule {}
