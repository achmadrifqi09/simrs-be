import { Module } from '@nestjs/common';
import { VillageService } from './service/village.service';
import { VillageController } from './controller/village.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { VillageRepository } from './repository/village.repository';

@Module({
  imports: [PrismaModule],
  controllers: [VillageController],
  providers: [VillageService, VillageRepository],
})
export class VillageModule {}
