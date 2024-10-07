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
} from '@nestjs/common';
import { MaritalStatusService } from '../service/marital-status.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { maritalStatusValidation } from '../validation/marital-status.validation';
import { MaritalStatusPayloadDTO } from '../dto/marital-status.dto';
import { religionUpdateStatusValidation } from '../../religion/validation/religion.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/marital-status')
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllMaritalStatus(@Query('keyword') keyword: string) {
    return this.maritalStatusService.findAllMaritalStatus(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
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
  async updateMaritalStatusVisibility(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(religionUpdateStatusValidation))
    maritalStatus: StatusUpdateDTO,
  ) {
    return this.maritalStatusService.updateVisibilityMaritalStatus(
      id,
      maritalStatus,
      req,
    );
  }

  @Delete('/:id')
  async softDeleteMaritalStatus(@Param('id') id: number, @Req() req: any) {
    return this.maritalStatusService.softDeleteMaritalStatus(id, req);
  }
}
