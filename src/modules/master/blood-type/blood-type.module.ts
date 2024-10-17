import { Module } from '@nestjs/common';
import { BloodTypeService } from './service/blood-type.service';
import { BloodTypeController } from './controller/blood-type.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BloodTypeRepository } from './repository/blood-type.respository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [BloodTypeController],
  providers: [BloodTypeService, BloodTypeRepository],
})
export class BloodTypeModule {}
