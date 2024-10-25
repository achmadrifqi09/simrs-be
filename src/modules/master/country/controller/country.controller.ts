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
import { CountryService } from '../service/country.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { UpdateStatus } from '../../../../common/types/common.type';
import {
  countryStatusValidation,
  countryValidation,
} from '../validation/country.validation';
import { CountryPayloadDTO } from '../dto/country.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/country')
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
  @UseGuards(AccessMenuGuard)
  @Permission('negara', Action.CAN_CREATE)
  async createCountry(
    @Req() req: any,
    @Body(new ZodPipe(countryValidation)) country: CountryPayloadDTO,
  ) {
    return this.countryService.createCountry(country, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('negara', Action.CAN_UPDATE)
  async updateCountry(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(countryValidation)) country: CountryPayloadDTO,
  ) {
    return this.countryService.updateCountry(id, country, req);
  }

  @UseGuards(AccessMenuGuard)
  @Permission('negara', Action.CAN_DELETE)
  @Delete('/:id')
  async softDeleteCountry(@Param('id') id: number, @Req() req: any) {
    return this.countryService.softDeleteCountry(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('negara', Action.CAN_UPDATE)
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(countryStatusValidation))
    country: UpdateStatus,
  ) {
    return this.countryService.updateStatusCountry(id, country, req);
  }
}
