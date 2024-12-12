import { Controller, Get, Param } from '@nestjs/common';
import { VClaimService } from '../../service/v-claim.service';
import { Public } from 'src/decorators/public/public.decorator';

@Controller({
  path: '/bpjs/v-claim',
  version: '1',
})
export class VClaimController {
  constructor(private readonly vClaimService: VClaimService) {}

  @Public()
  @Get('/participant/:bpjs_number')
  async findPatientReference(@Param('bpjs_number') BPJSNumber: string) {
    return this.vClaimService.findAllPatientReference(BPJSNumber);
  }

  @Get('/participant/reference/:reference_number')
  async findPatientReferenceByReferenceNumber(
    @Param('reference_number') referenceNumber: string,
  ) {
    return this.vClaimService.findPatientReferenceByReferenceNumber(
      referenceNumber,
    );
  }

  @Get('/reference/polyclinic/:keyword')
  async findPolyclinic(@Param('keyword') keyword: string) {
    return this.vClaimService.findPolyclinicReference(keyword);
  }

  @Get('/reference/doctor')
  async findDoctorDPJP() {
    return this.vClaimService.findDoctorDPJP();
  }
}
