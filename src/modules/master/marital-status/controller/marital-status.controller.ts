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
import { MaritalStatusService } from '../service/marital-status.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { maritalStatusValidation } from '../validation/marital-status.validation';
import { MaritalStatusPayloadDTO } from '../dto/marital-status.dto';
import { religionUpdateStatusValidation } from '../../religion/validation/religion.validation';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/marital-status')
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllMaritalStatus(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.maritalStatusService.findAllMaritalStatus(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('status-kawin', Action.CAN_CREATE)
  async createMaritalStatus(
    @Req() req: any,
    @Body(new ZodPipe(maritalStatusValidation))
    maritalStatus: MaritalStatusPayloadDTO,
  ) {
    return this.maritalStatusService.createMaritalStatus(maritalStatus, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('status-kawin', Action.CAN_UPDATE)
  async updateMaritalStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(maritalStatusValidation))
    maritalStatus: MaritalStatusPayloadDTO,
  ) {
    return this.maritalStatusService.updateMartialStatus(
      id,
      maritalStatus,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('status-kawin', Action.CAN_UPDATE)
  async updateMaritalStatusVisibility(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(religionUpdateStatusValidation))
    maritalStatus: UpdateStatus,
  ) {
    return this.maritalStatusService.updateVisibilityMaritalStatus(
      id,
      maritalStatus,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('status-kawin', Action.CAN_DELETE)
  async softDeleteMaritalStatus(@Param('id') id: number, @Req() req: any) {
    return this.maritalStatusService.softDeleteMaritalStatus(id, req);
  }
}
