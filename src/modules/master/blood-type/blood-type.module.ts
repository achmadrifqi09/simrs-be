import { Module } from '@nestjs/common';
import { BloodTypeService } from './service/blood-type.service';
import { BloodTypeController } from './controller/blood-type.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BloodTypeRepository } from './repository/blood-type.respository';

@Module({
  imports: [PrismaModule],
  controllers: [BloodTypeController],
  providers: [BloodTypeService, BloodTypeRepository],
})
export class BloodTypeModule {}
