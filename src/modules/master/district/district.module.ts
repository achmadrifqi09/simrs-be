import { Module } from '@nestjs/common';
import { DistrictService } from './service/district.service';
import { DistrictController } from './controller/district.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { DistrictRepository } from './repository/district.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
})
export class DistrictModule {}
