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
import { BedService } from '../service/bed.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  bedValidation,
  updateBedAvailabilityValidation,
  updateVisibilityBed,
} from '../validation/bed.validation';
import { BedPayloadDTO } from '../dto/bed.dto';
import {
  BedAvailabilityDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/bed')
export class BedController {
  constructor(private readonly bedService: BedService) {
  }

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBed(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.bedService.findAllBed(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createBed(
    @Req() req: any,
    @Body(new ZodPipe(bedValidation)) roomType: BedPayloadDTO,
  ) {
    return this.bedService.createBed(roomType, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateNed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(bedValidation)) bed: BedPayloadDTO,
  ) {
    return this.bedService.updateBed(id, bed, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusBed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(updateVisibilityBed))
    bed: StatusUpdateDTO,
  ) {
    return this.bedService.updateStatusBed(id, bed, req);
  }

  @Patch('/:id/availability')
  @Header('Content-Type', 'application/json')
  async updateAvailabilityBed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(updateBedAvailabilityValidation))
    bed: BedAvailabilityDTO,
  ) {
    return this.bedService.updateAvailabilityBed(id, bed, req);
  }

  @Delete('/:id')
  async softDeleteBed(@Param('id') id: number, @Req() req: any) {
    return this.bedService.softDeleteBed(id, req);
  }
}
