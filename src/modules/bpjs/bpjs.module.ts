import { Module } from '@nestjs/common';
import { VClaimService } from './service/v-claim.service';
import { BPJSHttpHelper } from './helper/bpjs-http.helper';
import { VClaimController } from './controller/v-claim/v-claim.controller';
import { QueueController } from './controller/queue/queue.controller';
import { BPJSQueueService } from './service/queue.service';
import { BPJSQueueRepository } from './repository/bpjs-queue.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAccessModule } from '../user-access/user-access.module';
import { TaskIdService } from './service/task-id.service';
import { TaskIdController } from './controller/task-id/task-id.controller';
import { UpdateTaskIdListener } from 'src/events/listener/update-task-id.listener';
import { BPJSTaskIdRepository } from './repository/bpjs-task-id.repository';

@Module({
  providers: [
    VClaimService,
    BPJSHttpHelper,
    BPJSQueueService,
    BPJSQueueRepository,
    TaskIdService,
    UpdateTaskIdListener,
    BPJSTaskIdRepository,
  ],
  imports: [PrismaModule, UserAccessModule],
  exports: [VClaimService, BPJSQueueService],
  controllers: [VClaimController, QueueController, TaskIdController],
})
export class BPJSModule {}
