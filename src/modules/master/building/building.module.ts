import { Module } from '@nestjs/common';
import { BuildingService } from './service/building.service';
import { BuildingController } from './controller/building.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BuildingRepository } from './repository/building.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [BuildingController],
  providers: [BuildingService, BuildingRepository],
})
export class BuildingModule {}
