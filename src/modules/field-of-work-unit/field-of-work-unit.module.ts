import { Module } from '@nestjs/common';
import { FieldOfWorkUnitService } from './service/field-of-work-unit.service';
import { FieldOfWorkUnitController } from './controller/field-of-work-unit.controller';
import { UserAccessModule } from '../user-access/user-access.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { FieldOfWorkUnitRepository } from './repository/field-of-work-unit.repository';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [FieldOfWorkUnitController],
  providers: [FieldOfWorkUnitService, FieldOfWorkUnitRepository],
})
export class FieldOfWorkUnitModule {}
