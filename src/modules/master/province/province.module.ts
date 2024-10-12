import { Module } from '@nestjs/common';
import { ProvinceService } from './service/province.service';
import { ProvinceController } from './controller/province.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ProvinceRepository } from './repository/province.repository';
import { PermissionModule } from '../../permission/permission.module';

@Module({
  imports: [PrismaModule, PermissionModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
})
export class ProvinceModule {}
