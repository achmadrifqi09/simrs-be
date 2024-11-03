import { Module } from '@nestjs/common';
import { DoctorScheduleService } from './service/doctor-schedule.service';
import { DoctorScheduleController } from './controller/doctor-schedule.controller';
import { DoctorScheduleRepository } from './repository/doctor-schedule.repository';
import { UserAccessModule } from '../user-access/user-access.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [DoctorScheduleController],
  providers: [DoctorScheduleService, DoctorScheduleRepository],
})
export class DoctorScheduleModule {}
