import { Module } from '@nestjs/common';
import { UserAccessService } from './service/user-access.service';
import { UserAccessController } from './controller/user-access.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserAccessRepository } from './repository/user-access.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserAccessController],
  providers: [UserAccessService, UserAccessRepository],
  exports: [UserAccessService],
})
export class UserAccessModule {}
