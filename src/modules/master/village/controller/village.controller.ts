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
import { VillageService } from '../service/village.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { villageValidation } from '../validation/village.validation';
import { VillagePayloadDTO } from '../dto/village.dto';

@Controller('/api/v1/master/village')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllVillage(
    @Query('keyword') keyword: string,
    @Query('districtId') districtId: string,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.villageService.findAllVillage(keyword, districtId, skip, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createVillage(
    @Req() req: any,
    @Body(new ZodPipe(villageValidation)) village: VillagePayloadDTO,
  ) {
    return this.villageService.createVillage(village, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
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
  async villageSoftDelete(@Param('id') id: string, @Req() req: any) {
    return this.villageService.villageSoftDelete(id, req);
  }
}
