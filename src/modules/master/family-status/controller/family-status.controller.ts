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
import { FamilyStatusService } from '../service/family-status.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  familyStatusValidation,
  familyStatusVisibilityValidation,
} from '../validation/family-status.validation';
import { FamilyStatusPayloadDTO } from '../dto/family-status.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/family-status')
export class FamilyStatusController {
  constructor(private readonly familyStatusService: FamilyStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllFamilyStatus(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.familyStatusService.findAllFamilyStatus(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createFamilyStatus(
    @Req() req: any,
    @Body(new ZodPipe(familyStatusValidation))
    familyStatus: FamilyStatusPayloadDTO,
  ) {
    return this.familyStatusService.createFamilyStatus(familyStatus, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateFamilyStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(familyStatusValidation))
    familyStatus: FamilyStatusPayloadDTO,
  ) {
    return this.familyStatusService.updateFamilyStatus(id, familyStatus, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateVisibilityFamilyStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(familyStatusVisibilityValidation))
    familyStatus: StatusUpdateDTO,
  ) {
    return this.familyStatusService.updateVisibilityFamilyStatus(
      id,
      familyStatus,
      req,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  async softDeleteFamilyStatus(@Param('id') id: number, @Req() req: any) {
    return this.familyStatusService.familyStatusSoftDelete(id, req);
  }
}
