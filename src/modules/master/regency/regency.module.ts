import { Module } from '@nestjs/common';
import { RegencyService } from './service/regency.service';
import { RegencyController } from './controller/regency.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RegencyRepository } from './repository/regency.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [RegencyController],
  providers: [RegencyService, RegencyRepository],
})
export class RegencyModule {}
