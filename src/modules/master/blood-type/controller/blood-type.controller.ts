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
import { BloodTypeService } from '../service/blood-type.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { BloodTypePayloadDTO } from '../dto/blood-type.dto';
import {
  bloodTypeUpdateStatusValidation,
  bloodTypeValidation,
} from '../validation/blood-type.validation';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/blood-type')
export class BloodTypeController {
  constructor(private readonly bloodTypeService: BloodTypeService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBloodType(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.bloodTypeService.finAllBloodType(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('golongan-darah', Action.CAN_CREATE)
  async createBloodType(
    @Req() req: any,
    @Body(new ZodPipe(bloodTypeValidation)) bloodType: BloodTypePayloadDTO,
  ) {
    return this.bloodTypeService.createBloodType(bloodType, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('golongan-darah', Action.CAN_UPDATE)
  async updateStatusBloodType(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(bloodTypeUpdateStatusValidation))
    bloodType: UpdateStatus,
  ) {
    return this.bloodTypeService.updateStatusBloodType(id, bloodType, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('golongan-darah', Action.CAN_UPDATE)
  async updateBloodType(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(bloodTypeValidation))
    bloodType: BloodTypePayloadDTO,
  ) {
    return this.bloodTypeService.updateBloodType(id, bloodType, req);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('golongan-darah', Action.CAN_DELETE)
  async softDeleteBloodType(@Param('id') id: number, @Req() req: any) {
    return this.bloodTypeService.bloodTypeSoftDelete(id, req);
  }
}
