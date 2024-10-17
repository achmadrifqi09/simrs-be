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
import { RegencyService } from '../service/regency.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { regencyValidation } from '../validation/regency.validation';
import { RegencyPayloadDTO } from '../dto/regency.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/api/v1/master/regency')
export class RegencyController {
  constructor(private readonly regencyService: RegencyService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRegency(
    @Query('keyword') keyword: string,
    @Query('provinceId') provinceId: string,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.regencyService.findAllRegency(keyword, provinceId, skip, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kabupaten-kota', Action.CAN_CREATE)
  async createProvince(
    @Req() req: any,
    @Body(new ZodPipe(regencyValidation)) regency: RegencyPayloadDTO,
  ) {
    return this.regencyService.createRegency(regency, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kabupaten-kota', Action.CAN_UPDATE)
  async updateRegency(
    @Param('id') id: string,
    @Req() req: any,
    @Body(new ZodPipe(regencyValidation))
    regency: RegencyPayloadDTO,
  ) {
    return this.regencyService.updateRegency(id, regency, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kabupaten-kota', Action.CAN_DELETE)
  async regencySoftDelete(@Param('id') id: string, @Req() req: any) {
    return this.regencyService.regencySoftDelete(id, req);
  }
}
