import {
  Controller,
  Get,
  Header,
  Query,
  Post,
  HttpCode,
  Req,
  HttpStatus,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ZodPipe } from 'src/zod-pipe/zod-pipe.pipe';
import { SocialStatusService } from '../service/social-status.service';
import {
  socialStatusValidation,
  socialStatusVisibilityValidation,
} from '../validation/social-status.validation';
import { SocialStatusPayloadDTO } from '../dto/social-status.dto';
import { StatusUpdateDTO } from 'src/common/dto/common.dto';

@Controller('/api/v1/master/social-status')
export class SocialStatusController {
  constructor(private readonly socialStatusService: SocialStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllSocialStatus(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.socialStatusService.findAllSocialStatus(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createSocialStatus(
    @Req() req: any,
    @Body(new ZodPipe(socialStatusValidation))
    socialStatus: SocialStatusPayloadDTO,
  ) {
    return this.socialStatusService.createSocialStatus(socialStatus, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateSocialStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(socialStatusValidation))
    socialStatus: SocialStatusPayloadDTO,
  ) {
    return this.socialStatusService.updateSocialStatus(id, socialStatus, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async updateVisibilitySocialStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(socialStatusVisibilityValidation))
    socialStatus: StatusUpdateDTO,
  ) {
    return this.socialStatusService.updateVisibilitySocialStatus(
      id,
      socialStatus,
      req,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  async softDeleteSocialStatus(@Param('id') id: number, @Req() req: any) {
    return this.socialStatusService.socialStatusSoftDelete(id, req);
  }
}
