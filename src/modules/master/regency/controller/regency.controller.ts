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
import { RegencyService } from '../service/regency.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { regencyValidation } from '../validation/regency.validation';
import { RegencyPayloadDTO } from '../dto/regency.dto';

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
  async createProvince(
    @Req() req: any,
    @Body(new ZodPipe(regencyValidation)) regency: RegencyPayloadDTO,
  ) {
    return this.regencyService.createRegency(regency, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateRegency(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(regencyValidation))
    regency: RegencyPayloadDTO,
  ) {
    return this.regencyService.updateRegency(id, regency, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  async regencySoftDelete(@Param('id') id: string, @Req() req: any) {
    return this.regencyService.regencySoftDelete(id, req);
  }
}
