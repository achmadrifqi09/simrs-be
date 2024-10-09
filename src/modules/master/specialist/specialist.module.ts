import { Module } from '@nestjs/common';
import { SpecialistService } from './service/specialist.service';
import { SpecialistController } from './controller/specialist.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { SpecialistRepository } from './repository/specialist.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SpecialistController],
  providers: [SpecialistService, SpecialistRepository],
})
export class SpecialistModule {}
