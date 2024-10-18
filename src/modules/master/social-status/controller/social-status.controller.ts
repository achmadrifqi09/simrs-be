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
  UseGuards,
} from '@nestjs/common';
import { ZodPipe } from 'src/zod-pipe/zod-pipe.pipe';
import { SocialStatusService } from '../service/social-status.service';
import {
  socialStatusValidation,
  socialStatusVisibilityValidation,
} from '../validation/social-status.validation';
import { SocialStatusPayloadDTO } from '../dto/social-status.dto';
import { StatusUpdateDTO } from 'src/common/dto/common.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

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
  @UseGuards(AccessMenuGuard)
  @Permission('status-sosial', Action.CAN_CREATE)
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
  @UseGuards(AccessMenuGuard)
  @Permission('status-sosial', Action.CAN_UPDATE)
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
  @UseGuards(AccessMenuGuard)
  @Permission('status-sosial', Action.CAN_UPDATE)
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
  @UseGuards(AccessMenuGuard)
  @Permission('status-sosial', Action.CAN_DELETE)
  async softDeleteSocialStatus(@Param('id') id: number, @Req() req: any) {
    return this.socialStatusService.socialStatusSoftDelete(id, req);
  }
}
