import { Controller, Get, Param } from '@nestjs/common';
import { VClaimService } from '../../service/v-claim.service';

@Controller({
  path: '/bpjs/v-claim',
  version: '1',
})
export class VClaimController {
  constructor(private readonly vClaimService: VClaimService) {}

  @Get('/participant/:bpjs_number')
  async findPatientReference(@Param('bpjs_number') BPJSNumber: string) {
    return this.vClaimService.findAllPatientReference(BPJSNumber);
  }

  @Get('/reference/polyclinic/:keyword')
  async findPolyclinic(@Param('keyword') keyword: string) {
    return this.vClaimService.findPolyclinicReference(keyword);
  }
}
