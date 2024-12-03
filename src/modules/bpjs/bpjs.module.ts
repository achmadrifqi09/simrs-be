import { Module } from '@nestjs/common';
import { VClaimService } from './service/v-claim.service';
import { BPJSHttpHelper } from './helper/bpjs-http.helper';
import { VClaimController } from './controller/v-claim/v-claim.controller';

@Module({
  providers: [VClaimService, BPJSHttpHelper],
  exports: [VClaimService],
  controllers: [VClaimController],
})
export class BPJSModule {}
