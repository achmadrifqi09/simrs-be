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
  Req, UseGuards,
} from '@nestjs/common';
import { ReligionService } from '../service/religion.service';
import {
  religionUpdateStatusValidation,
  religionValidation,
} from '../validation/religion.validation';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { ReligionPayloadDTO } from '../dto/religion.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/api/v1/master/religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllReligion(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.religionService.finAllReligion(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('agama', Action.CAN_CREATE)
  async createReligion(
    @Req() req: any,
    @Body(new ZodPipe(religionValidation)) religion: ReligionPayloadDTO,
  ) {
    return this.religionService.createReligion(religion, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kecamatan', Action.CAN_CREATE)
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
  @HttpCode(HttpStatus.OK)
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(religionUpdateStatusValidation))
    religion: StatusUpdateDTO,
  ) {
    return this.religionService.updateStatusReligion(id, religion, req);
  }
}
