import { Module } from '@nestjs/common';
import { VillageService } from './service/village.service';
import { VillageController } from './controller/village.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { VillageRepository } from './repository/village.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [VillageController],
  providers: [VillageService, VillageRepository],
})
export class VillageModule {}
