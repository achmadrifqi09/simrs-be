import { Module } from '@nestjs/common';
import { BedService } from './service/bed.service';
import { BedController } from './controller/bed.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BedRepository } from './repository/bed.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BedController],
  providers: [BedService, BedRepository],
})
export class BedModule {}
