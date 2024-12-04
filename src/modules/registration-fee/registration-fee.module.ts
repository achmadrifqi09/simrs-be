import { Module } from '@nestjs/common';
import { RegistrationFeeService } from './service/registration-fee.service';
import { RegistrationFeeController } from './controller/registration-fee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAccessModule } from '../user-access/user-access.module';
import { RegistrationFeeRepository } from './repository/registration-fee.repository';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [RegistrationFeeController],
  providers: [RegistrationFeeService, RegistrationFeeRepository],
})
export class RegistrationFeeModule {}
