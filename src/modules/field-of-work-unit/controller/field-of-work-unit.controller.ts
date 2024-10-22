import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FieldOfWorkUnitService } from '../service/field-of-work-unit.service';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  fieldOfWorkUnitValidation,
  statusFieldOfWorkUnitValidation,
} from '../validation/field-of-work-unit.validation';
import { FieldOfWorkUnit } from '@prisma/client';
import { UpdateStatus } from '../../../common/types/common.type';

@Controller('/field-of-work-unit')
export class FieldOfWorkUnitController {
  constructor(
    private readonly fieldOfWorkUnitService: FieldOfWorkUnitService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findFieldOfWorkUnit(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.fieldOfWorkUnitService.findFieldOfWorkUnit(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_CREATE)
  async createFieldOfWorkUnit(
    @Req() req: any,
    @Body(new ZodPipe(fieldOfWorkUnitValidation))
    fieldOfWorkUnit: FieldOfWorkUnit,
  ) {
    return this.fieldOfWorkUnitService.createFieldOfWorkUnit(
      fieldOfWorkUnit,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_UPDATE)
  async updateFieldOfWorkUnit(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(fieldOfWorkUnitValidation))
    fieldOFWorkUnit: FieldOfWorkUnit,
  ) {
    return this.fieldOfWorkUnitService.updateFieldOfWorkUnit(
      id,
      fieldOFWorkUnit,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_UPDATE)
  async updateFieldOfWorkUnitStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(statusFieldOfWorkUnitValidation))
    fieldOfWorkUnit: UpdateStatus,
  ) {
    return this.fieldOfWorkUnitService.updateFieldOfWorkUnitStatus(
      id,
      fieldOfWorkUnit,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('unit-kerja', Action.CAN_DELETE)
  async softDeleteFieldOfWorkUnit(@Param('id') id: number, @Req() req: any) {
    return this.fieldOfWorkUnitService.softDeleteFieldOfWorkUnit(id, req);
  }
}
