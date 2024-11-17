import { Module } from '@nestjs/common';
import { PatientService } from './service/patient.service';
import { PatientController } from './controller/patient.controller';
import { PatientRepository } from './repository/patient.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
  exports: [PatientService],
})
export class PatientModule {}
