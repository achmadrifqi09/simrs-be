import { Module } from '@nestjs/common';
import { VClaimService } from './service/v-claim.service';
import { BPJSHttpHelper } from './helper/bpjs-http.helper';

@Module({
  providers: [VClaimService, BPJSHttpHelper],
  exports: [VClaimService],
})
export class BPJSModule {}
