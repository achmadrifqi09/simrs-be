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
import { EducationLevelPayloadDTO } from '../dto/education-level.dto';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  educationLevelValidation,
  educationLevelVisibilityValidation,
} from '../validation/education-level.validation';
import { UpdateStatus } from '../../../../common/types/common.type';
import { EducationLevelService } from '../service/education-level.service';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller({
  path: '/master/education-level',
  version: '1',
})
export class EducationLevelController {
  constructor(private readonly educationLevelService: EducationLevelService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllEducationLevel(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.educationLevelService.findAllEducationLevel(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('tingkat-pendidikan', Action.CAN_CREATE)
  async createEducationLevel(
    @Req() req: any,
    @Body(new ZodPipe(educationLevelValidation))
    educationLevel: EducationLevelPayloadDTO,
  ) {
    return this.educationLevelService.createEducationLevel(educationLevel, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('tingkat-pendidikan', Action.CAN_UPDATE)
  async updateEducationLevel(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(educationLevelValidation))
    educationLevel: EducationLevelPayloadDTO,
  ) {
    return this.educationLevelService.updateEducationLevel(
      id,
      educationLevel,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('tingkat-pendidikan', Action.CAN_UPDATE)
  async updateVisibilityEducationLevel(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(educationLevelVisibilityValidation))
    educationLevel: UpdateStatus,
  ) {
    return this.educationLevelService.updateVisibilityEducationLevel(
      id,
      educationLevel,
      req,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('tingkat-pendidikan', Action.CAN_DELETE)
  async educationLevelSoftDelete(@Param('id') id: number, @Req() req: any) {
    return this.educationLevelService.educationLevelSoftDelete(id, req);
  }
}
