import { Module } from '@nestjs/common';
import { FamilyStatusService } from './service/family-status.service';
import { FamilyStatusController } from './controller/family-status.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { FamilyStatusRepository } from './repository/family-status.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [FamilyStatusController],
  providers: [FamilyStatusService, FamilyStatusRepository],
})
export class FamilyStatusModule {}
