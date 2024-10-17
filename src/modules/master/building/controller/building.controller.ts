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
import { BuildingService } from '../service/building.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { BuildingPayloadDTO } from '../dto/building.dto';
import {
  buildingValidation,
  buildingVisibilityValidation,
} from '../validation/building.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBuilding(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.buildingService.findAllBuilding(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createBuilding(
    @Req() req: any,
    @Body(new ZodPipe(buildingValidation)) building: BuildingPayloadDTO,
  ) {
    return this.buildingService.createBuilding(building, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateBuilding(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(buildingValidation)) building: BuildingPayloadDTO,
  ) {
    return this.buildingService.updateBuilding(id, building, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusBuilding(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(buildingVisibilityValidation))
    building: StatusUpdateDTO,
  ) {
    return this.buildingService.updateStatusBuilding(id, building, req);
  }

  @Delete('/:id')
  async softDeleteBuilding(@Param('id') id: number, @Req() req: any) {
    return this.buildingService.softDeleteBuilding(id, req);
  }
}
