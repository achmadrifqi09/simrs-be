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
import { SpecialistService } from '../service/specialist.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import {
  specialistStatusValidation,
  specialistValidation,
} from '../validation/specialist.validation';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';

@Controller('/api/v1/master/specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllSpecialist(@Query('keyword') keyword: string) {
    return this.specialistService.findAllSpecialist(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createSpecialist(
    @Req() req: any,
    @Body(new ZodPipe(specialistValidation)) specialist: SpecialistPayloadDTO,
  ) {
    return this.specialistService.createSpecialist(specialist, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateSpecialist(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(specialistValidation)) specialist: SpecialistPayloadDTO,
  ) {
    return this.specialistService.updateSpecialist(id, specialist, req);
  }

  @Delete('/:id')
  async softDeleteSpecialist(@Param('id') id: number, @Req() req: any) {
    return this.specialistService.softDeleteSpecialist(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(specialistStatusValidation))
    specialist: StatusUpdateDTO,
  ) {
    return this.specialistService.updateStatusSpecialist(id, specialist, req);
  }
}
