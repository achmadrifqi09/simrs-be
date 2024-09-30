import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post, Req,
} from '@nestjs/common';
import { ReligionService } from '../service/religion.service';
import { religionSchema } from '../validation/religion-schema';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { ReligionDTO } from '../dto/religio.dto';

@Controller('/api/v1/religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createReligion(
    @Req() req: any,
    @Body(new ZodPipe(religionSchema)) religion: ReligionDTO,
  ) {
    return this.religionService.createReligion(religion, req);
  }
}
