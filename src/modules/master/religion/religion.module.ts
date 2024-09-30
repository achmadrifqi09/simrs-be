import { Module } from '@nestjs/common';
import { ReligionService } from './service/religion.service';
import { ReligionController } from './controller/religion.controller';
import { ReligionRepository } from './repository/religion.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReligionController],
  providers: [ReligionService, ReligionRepository],
  exports: [ReligionService],
})
export class ReligionModule {}
