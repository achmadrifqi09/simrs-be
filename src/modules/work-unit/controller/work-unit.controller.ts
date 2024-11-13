import {
  Controller,
  Dependencies,
  Get,
  Query,
  Header,
  Req,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { WorkUnitService } from '../service/work-unit.service';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  workUnitQueueStatusValidation,
  workUnitStatusValidation,
  workUnitValidation,
} from '../validation/work-unit.validation';
import { WorkUnit, WorkUnitUpdateQueueStatus } from '../dto/work-unit.dto';
import { UpdateStatus } from '../../../common/types/common.type';
import { Public } from '../../../decorators/public/public.decorator';

@Dependencies([WorkUnitService])
@Controller({
  path: '/work-unit',
  version: '1',
})
export class WorkUnitController {
  constructor(private readonly workUnitService: WorkUnitService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBed(
    @Query('keyword') keyword: string,
    @Query('service_type') service_type: number,
    @Query('work_unit_id') work_unit_id: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
    @Query('is_parent_unit') is_parent_unit: number,
    @Query('parent_id') parent_id: number,
    @Query('field_id') field_id: number,
  ) {
    return this.workUnitService.findAllWorkUnit(
      is_parent_unit,
      parent_id,
      field_id,
      keyword,
      service_type,
      work_unit_id,
      cursor,
      take,
    );
  }

  @Public()
  @Get('/polyclinic')
  @Header('Content-Type', 'application/json')
  async findActivePolyclinic(@Query('keyword') keyword: string) {
    return this.workUnitService.findActivePolyclinic(keyword);
  }

  @Get('/queue-unit/:bpjs_code')
  @Public()
  async findQueueUnitByBPJSCode(@Param('bpjs_code') BPJSCode: string) {
    return this.workUnitService.findQueueUnitByBPJSCode(BPJSCode);
  }

  @Get('/queue-unit')
  @Public()
  @Header('Content-Type', 'application/json')
  async findQueueUnit(
    @Query('keyword') keyword: string,
    @Query('unit_id') unit_id: number,
    @Query('service_type') service_type: number,
  ) {
    return this.workUnitService.findQueueUnit(keyword, unit_id, service_type);
  }

  @Get('/polyclinic/counter')
  @Header('Content-Type', 'application/json')
  async findPolyclinicCounter(@Query('keyword') keyword: string) {
    return this.workUnitService.findPolyclinicCounter(keyword);
  }

  @Get('/parent')
  @Header('Content-Type', 'application/json')
  async findParentWorkUnit(@Query('keyword') keyword: string) {
    return this.workUnitService.findParentWorkUnit(keyword);
  }

  @Get('/status/active')
  @Header('Content-Type', 'application/json')
  async findActiveSubOrParentUnit(@Query('keyword') keyword: string) {
    return this.workUnitService.findActiveSubOrParentUnit(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_CREATE)
  async createBed(
    @Req() req: any,
    @Body(new ZodPipe(workUnitValidation)) workUnit: WorkUnit,
  ) {
    return this.workUnitService.createWorkUnit(workUnit, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_UPDATE)
  async updateNed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(workUnitValidation)) workUnit: WorkUnit,
  ) {
    return this.workUnitService.updateWorkUnit(id, workUnit, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_UPDATE)
  async updateAvailabilityBed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(workUnitStatusValidation))
    workUnit: UpdateStatus,
  ) {
    return this.workUnitService.updateStatusWorkUnit(id, workUnit, req);
  }

  @Patch('/:id/queue-status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_UPDATE)
  async updateQueueStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(workUnitQueueStatusValidation))
    workUnit: WorkUnitUpdateQueueStatus,
  ) {
    return this.workUnitService.updateQueueStatus(id, workUnit, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_DELETE)
  async softDeleteWorkUnit(@Param('id') id: number, @Req() req: any) {
    return this.workUnitService.softDeleteWorkUnit(id, req);
  }
}
