import { Module } from '@nestjs/common';
import { RegistrationService } from './service/registration.service';
import { RegistrationController } from './controller/registration.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
