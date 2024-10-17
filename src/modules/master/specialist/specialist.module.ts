import { Module } from '@nestjs/common';
import { SpecialistService } from './service/specialist.service';
import { SpecialistController } from './controller/specialist.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { SpecialistRepository } from './repository/specialist.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [SpecialistController],
  providers: [SpecialistService, SpecialistRepository],
})
export class SpecialistModule {}
