import { Module } from '@nestjs/common';
import { WorkUnitService } from './service/work-unit.service';
import { WorkUnitController } from './controller/work-unit.controller';
import { WorkUnitRepository } from './repository/work-unit.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [WorkUnitController],
  providers: [WorkUnitService, WorkUnitRepository],
})
export class WorkUnitModule {}
