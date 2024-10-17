import { Module } from '@nestjs/common';
import { DistrictService } from './service/district.service';
import { DistrictController } from './controller/district.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { DistrictRepository } from './repository/district.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
})
export class DistrictModule {}
