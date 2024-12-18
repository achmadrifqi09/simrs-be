import { Module } from '@nestjs/common';
import { QueueService } from './service/queue.service';
import { QueueController } from './controller/queue.controller';
import { DoctorScheduleModule } from '../doctor-schedule/doctor-schedule.module';
import { QueueRepository } from './repository/queue.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { QueueServiceHelper } from './helper/queue-service.helper';
import { BPJSModule } from '../bpjs/bpjs.module';
import { PatientModule } from '../patient/patient.module';
import { QueueListener } from '../../events/listener/queue.listener';
import { RegistrationModule } from '../registration/registration.module';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [
    DoctorScheduleModule,
    PrismaModule,
    BPJSModule,
    PatientModule,
    RegistrationModule,
    UserAccessModule,
  ],
  controllers: [QueueController],
  providers: [QueueService, QueueRepository, QueueServiceHelper, QueueListener],
  exports: [QueueService],
})
export class QueueModule {}
