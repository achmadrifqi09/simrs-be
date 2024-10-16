import { Module } from '@nestjs/common';
import { FamilyStatusService } from './service/family-status.service';
import { FamilyStatusController } from './controller/family-status.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { FamilyStatusRepository } from './repository/family-status.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FamilyStatusController],
  providers: [FamilyStatusService, FamilyStatusRepository],
})
export class FamilyStatusModule {}
