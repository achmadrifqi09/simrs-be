import { Module } from '@nestjs/common';
import { EducationLevelService } from './service/education-level.service';
import { EducationLevelController } from './controller/education-level.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EducationLevelRepository } from './repository/education-level.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EducationLevelController],
  providers: [EducationLevelService, EducationLevelRepository],
})
export class EducationLevelModule {}
