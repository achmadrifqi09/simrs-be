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
import { CountryService } from '../service/country.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import {
  countryStatusValidation,
  countryValidation,
} from '../validation/country.validation';
import { CountryPayloadDTO } from '../dto/country.dto';

@Controller('/api/v1/master/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllCountry(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.countryService.findAllCountry(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createCountry(
    @Req() req: any,
    @Body(new ZodPipe(countryValidation)) country: CountryPayloadDTO,
  ) {
    return this.countryService.createCountry(country, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateCountry(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(countryValidation)) country: CountryPayloadDTO,
  ) {
    return this.countryService.updateCountry(id, country, req);
  }

  @Delete('/:id')
  async softDeleteCountry(@Param('id') id: number, @Req() req: any) {
    return this.countryService.softDeleteCountry(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(countryStatusValidation))
    country: StatusUpdateDTO,
  ) {
    return this.countryService.updateStatusCountry(id, country, req);
  }
}
