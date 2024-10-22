import { Module } from '@nestjs/common';
import { CounterService } from './service/counter.service';
import { CounterController } from './controller/counter.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CounterRepository } from './repository/counter.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [CounterController],
  providers: [CounterService, CounterRepository],
  exports: [CounterService],
})
export class CounterModule {}
