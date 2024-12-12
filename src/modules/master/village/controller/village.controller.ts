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
import { VillageService } from '../service/village.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { villageValidation } from '../validation/village.validation';
import { VillagePayloadDTO } from '../dto/village.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller({
  path: '/master/village',
  version: '1',
})
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllVillage(
    @Query('keyword') keyword: string,
    @Query('district_id') districtId: string,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.villageService.findAllVillage(keyword, districtId, skip, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kelurahan-desa', Action.CAN_CREATE)
  async createVillage(
    @Req() req: any,
    @Body(new ZodPipe(villageValidation)) village: VillagePayloadDTO,
  ) {
    return this.villageService.createVillage(village, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kelurahan-desa', Action.CAN_UPDATE)
  async updateVillage(
    @Param('id') id: string,
    @Req() req: any,
    @Body(new ZodPipe(villageValidation))
    village: VillagePayloadDTO,
  ) {
    return this.villageService.updateVillage(id, village, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kelurahan-desa', Action.CAN_DELETE)
  async villageSoftDelete(@Param('id') id: string, @Req() req: any) {
    return this.villageService.villageSoftDelete(id, req);
  }
}
