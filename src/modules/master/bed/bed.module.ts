import { Module } from '@nestjs/common';
import { BedService } from './service/bed.service';
import { BedController } from './controller/bed.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BedRepository } from './repository/bed.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [BedController],
  providers: [BedService, BedRepository],
})
export class BedModule {}
