import { Controller, Param, Get } from '@nestjs/common';
import { MasterService } from '../../service/master/master.service';

@Controller({
  path: '/satu-sehat/master',
  version: '1',
})
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get('/patient/:nik')
  async findPatientByNik(@Param('nik') NIK: string) {
    return this.masterService.findPatientByNIK(NIK);
  }
}
