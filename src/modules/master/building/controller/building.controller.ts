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
import { BuildingService } from '../service/building.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { BuildingPayloadDTO } from '../dto/building.dto';
import {
  buildingValidation,
  buildingVisibilityValidation,
} from '../validation/building.validation';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/building')
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
  @UseGuards(AccessMenuGuard)
  @Permission('gedung', Action.CAN_CREATE)
  async createBuilding(
    @Req() req: any,
    @Body(new ZodPipe(buildingValidation)) building: BuildingPayloadDTO,
  ) {
    return this.buildingService.createBuilding(building, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('gedung', Action.CAN_UPDATE)
  async updateBuilding(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(buildingValidation)) building: BuildingPayloadDTO,
  ) {
    return this.buildingService.updateBuilding(id, building, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('gedung', Action.CAN_UPDATE)
  async updateStatusBuilding(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(buildingVisibilityValidation))
    building: UpdateStatus,
  ) {
    return this.buildingService.updateStatusBuilding(id, building, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('gedung', Action.CAN_DELETE)
  async softDeleteBuilding(@Param('id') id: number, @Req() req: any) {
    return this.buildingService.softDeleteBuilding(id, req);
  }
}
