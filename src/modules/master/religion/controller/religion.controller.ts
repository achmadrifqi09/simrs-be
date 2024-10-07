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
import { ReligionService } from '../service/religion.service';
import {
  religionUpdateStatusValidation,
  religionValidation,
} from '../validation/religion.validation';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { ReligionPayloadDTO } from '../dto/religion.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllReligion(@Query('keyword') keyword: string) {
    return this.religionService.finAllReligion(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createReligion(
    @Req() req: any,
    @Body(new ZodPipe(religionValidation)) religion: ReligionPayloadDTO,
  ) {
    return this.religionService.createReligion(religion, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(religionValidation)) religion: ReligionPayloadDTO,
  ) {
    return this.religionService.updateReligion(id, religion, req);
  }

  @Delete('/:id')
  async softDeleteReligion(@Param('id') id: number, @Req() req: any) {
    return this.religionService.softDeleteReligion(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(religionUpdateStatusValidation))
    religion: StatusUpdateDTO,
  ) {
    return this.religionService.updateStatusReligion(id, religion, req);
  }
}
