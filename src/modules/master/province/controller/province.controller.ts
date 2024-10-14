import {
  Body,
  Controller,
  Delete,
  Dependencies,
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
import { ProvinceService } from '../service/province.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { provinceValidation } from '../validation/province.validation';
import { ProvincePayloadDTO } from '../dto/province.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Action } from '../../../../common/enums/action.enum';
import { Permission } from '../../../../decorators/permission.decorator';

@Dependencies([ProvinceService])
@Controller('/api/v1/master/province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllProvince(
    @Query('keyword') keyword: string,
    @Query('countryId') countryId: number,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.provinceService.findAllProvince(keyword, countryId, skip, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('provinsi', Action.CAN_CREATE)
  async createProvince(
    @Req() req: any,
    @Body(new ZodPipe(provinceValidation)) province: ProvincePayloadDTO,
  ) {
    return this.provinceService.createProvince(province, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('provinsi', Action.CAN_UPDATE)
  async updateProvince(
    @Param('id') id: string,
    @Req() req: any,
    @Body(new ZodPipe(provinceValidation))
    province: ProvincePayloadDTO,
  ) {
    return this.provinceService.updateProvince(id, province, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('provinsi', Action.CAN_DELETE)
  async provinceSoftDelete(@Param('id') id: number | string, @Req() req: any) {
    return this.provinceService.provinceSoftDelete(id, req);
  }
}
