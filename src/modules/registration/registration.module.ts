import { Module } from '@nestjs/common';
import { RegistrationService } from './service/registration.service';
import { RegistrationController } from './controller/registration.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RegistrationRepository } from './repository/registration.repository';
import { UserAccessModule } from '../user-access/user-access.module';
import { BPJSModule } from '../bpjs/bpjs.module';

@Module({
  imports: [PrismaModule, UserAccessModule, BPJSModule],
  controllers: [RegistrationController],
  providers: [RegistrationService, RegistrationRepository],
  exports: [RegistrationService],
})
export class RegistrationModule {}
