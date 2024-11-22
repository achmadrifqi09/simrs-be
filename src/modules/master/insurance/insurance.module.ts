import { Module } from '@nestjs/common';
import { InsuranceService } from './service/insurance.service';
import { InsuranceController } from './controller/insurance.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { InsuranceRepository } from './repository/insurance.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [InsuranceController],
  providers: [InsuranceService, InsuranceRepository],
})
export class InsuranceModule {}
