import {
  Controller,
  Dependencies,
  Get,
  Query,
  Header,
  Req,
} from '@nestjs/common';
import { WorkUnitService } from '../service/work-unit.service';

@Dependencies([WorkUnitService])
@Controller('/api/v1/work-unit')
export class WorkUnitController {
  constructor(private readonly workUnitService: WorkUnitService) {}

  @Get('/polyclinic')
  @Header('Content-Type', 'application/json')
  async findPolyclinic(@Query('keyword') keyword: string, @Req() req: any) {
    return this.workUnitService.getPolyclinic(keyword);
  }
}
