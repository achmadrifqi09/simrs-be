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
import { SpecialistService } from '../service/specialist.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import {
  specialistStatusValidation,
  specialistValidation,
} from '../validation/specialist.validation';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/api/v1/master/specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllSpecialist(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.specialistService.findAllSpecialist(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('spesialis-dokter', Action.CAN_CREATE)
  async createSpecialist(
    @Req() req: any,
    @Body(new ZodPipe(specialistValidation)) specialist: SpecialistPayloadDTO,
  ) {
    return this.specialistService.createSpecialist(specialist, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('spesialis-dokter', Action.CAN_UPDATE)
  async updateSpecialist(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(specialistValidation)) specialist: SpecialistPayloadDTO,
  ) {
    return this.specialistService.updateSpecialist(id, specialist, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('spesialis-dokter', Action.CAN_DELETE)
  async softDeleteSpecialist(@Param('id') id: number, @Req() req: any) {
    return this.specialistService.softDeleteSpecialist(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @HttpCode(HttpStatus.OK)
  @Permission('spesialis-dokter', Action.CAN_UPDATE)
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(specialistStatusValidation))
    specialist: StatusUpdateDTO,
  ) {
    return this.specialistService.updateStatusSpecialist(id, specialist, req);
  }
}
