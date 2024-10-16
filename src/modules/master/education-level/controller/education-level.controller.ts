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
import { EducationLevelPayloadDTO } from '../dto/education-level.dto';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  educationLevelValidation,
  educationLevelVisibilityValidation,
} from '../validation/education-level.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import { EducationLevelService } from '../service/education-level.service';

@Controller('/api/v1/master/education-level')
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
  async updateVisibilityEducationLevel(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(educationLevelVisibilityValidation))
    educationLevel: StatusUpdateDTO,
  ) {
    return this.educationLevelService.updateVisibilityEducationLevel(
      id,
      educationLevel,
      req,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  async educationLevelSoftDelete(@Param('id') id: number, @Req() req: any) {
    return this.educationLevelService.educationLevelSoftDelete(id, req);
  }
}
