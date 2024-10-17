import { Module } from '@nestjs/common';
import { SocialStatusService } from './service/social-status.service';
import { SocialStatusController } from './controller/social-status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocialStatusRepository } from './repository/social-status.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [SocialStatusController],
  providers: [SocialStatusService, SocialStatusRepository],
})
export class SocialStatusModule {}
