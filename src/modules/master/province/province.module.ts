import { Module } from '@nestjs/common';
import { ProvinceService } from './service/province.service';
import { ProvinceController } from './controller/province.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ProvinceRepository } from './repository/province.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
})
export class ProvinceModule {}
