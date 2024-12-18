import { Module } from '@nestjs/common';
import { MasterService } from './service/master/master.service';
import { AuthService } from './service/auth/auth.service';
import { MasterController } from './controller/master/master.controller';

@Module({
  providers: [MasterService, AuthService],
  controllers: [MasterController],
})
export class SatuSehatModule {}
