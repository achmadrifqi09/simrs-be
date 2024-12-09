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

  @Get('/reference/:service_type/doctor/:service_date/specialist/:specialist')
  async findDoctorDPJP(
    @Param('service_type') serviceType: number,
    @Param('service_date') serviceDate: string,
    @Param('specialist') specialist: string,
  ) {
    return this.vClaimService.findDoctorDPJP(
      serviceType,
      serviceDate,
      specialist,
    );
  }
}
