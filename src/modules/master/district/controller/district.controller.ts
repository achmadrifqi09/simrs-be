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
import { DistrictService } from '../service/district.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { districtValidation } from '../validation/district.validation';
import { DistrictPayloadDTO } from '../dto/district.dto';

@Controller('/api/v1/master/district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRegency(
    @Query('keyword') keyword: string,
    @Query('regencyId') regencyId: string,
    @Query('cursor') skip: number,
    @Query('take') take: number,
  ) {
    return this.districtService.findAllDistrict(keyword, regencyId, skip, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createDistrict(
    @Req() req: any,
    @Body(new ZodPipe(districtValidation)) regency: DistrictPayloadDTO,
  ) {
    return this.districtService.createDistrict(regency, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateDistrict(
    @Param('id') id: string,
    @Req() req: any,
    @Body(new ZodPipe(districtValidation))
    district: DistrictPayloadDTO,
  ) {
    return this.districtService.updateDistrict(id, district, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  async districtSoftDelete(@Param('id') id: string, @Req() req: any) {
    return this.districtService.districtSoftDelete(id, req);
  }
}
