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
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/api/v1/master/bed')
export class BedController {
  constructor(private readonly bedService: BedService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBed(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
    @Query('bedId') bedId: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.bedService.findAllBed(keyword, status, bedId, cursor, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_CREATE)
  async createBed(
    @Req() req: any,
    @Body(new ZodPipe(bedValidation)) roomType: BedPayloadDTO,
  ) {
    return this.bedService.createBed(roomType, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_UPDATE)
  async updateNed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(bedValidation)) bed: BedPayloadDTO,
  ) {
    return this.bedService.updateBed(id, bed, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_UPDATE)
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_UPDATE)
  async updateAvailabilityBed(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(updateBedAvailabilityValidation))
    bed: BedAvailabilityDTO,
  ) {
    return this.bedService.updateAvailabilityBed(id, bed, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_DELETE)
  async softDeleteBed(@Param('id') id: number, @Req() req: any) {
    return this.bedService.softDeleteBed(id, req);
  }
}
