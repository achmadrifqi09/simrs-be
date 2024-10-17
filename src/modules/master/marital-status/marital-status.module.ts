import { Module } from '@nestjs/common';
import { MaritalStatusService } from './service/marital-status.service';
import { MaritalStatusController } from './controller/marital-status.controller';
import { MaritalStatusRepository } from './repository/marital-status.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [MaritalStatusController],
  providers: [MaritalStatusService, MaritalStatusRepository],
})
export class MaritalStatusModule {}
