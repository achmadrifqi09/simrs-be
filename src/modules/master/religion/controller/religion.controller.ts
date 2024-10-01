import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ReligionService } from '../service/religion.service';
import { religionSchema } from '../validation/religion-schema';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { ReligionPayloadDTO } from '../dto/religio.dto';

@Controller('/api/v1/religion')
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
    @Body(new ZodPipe(religionSchema)) religion: ReligionPayloadDTO,
  ) {
    return this.religionService.createReligion(religion, req);
  }
}
