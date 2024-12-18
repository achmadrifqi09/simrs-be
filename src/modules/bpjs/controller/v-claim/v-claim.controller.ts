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

  @Get('/reference/health-facility/:health_facility_name/:facility_type')
  async findHealtFacility(
    @Param('health_facility_name') healthFacilityName: string,
    @Param('facility_type') facilityType: number,
  ) {
    return this.vClaimService.findHealthFacility(
      healthFacilityName,
      facilityType,
    );
  }

  @Get('/reference/province')
  async findProvince() {
    return this.vClaimService.findProvince();
  }

  @Get('/reference/province/:province_code/regency')
  async findRegency(@Param('province_code') provinceCode: string) {
    return this.vClaimService.findRegency(provinceCode);
  }

  @Get('/reference/province/:province_code/regency/:regency_code/subdistrict')
  async findSubdistrict(@Param('regency_code') regencyCode: string) {
    return this.vClaimService.findSubdistrict(regencyCode);
  }

  @Get('/reference/diagnosis/:dianosis_keywod')
  async findDiagnosis(@Param('dianosis_keywod') diagnosisKeyword: string) {
    return this.vClaimService.findDiagnosis(diagnosisKeyword);
  }
}
