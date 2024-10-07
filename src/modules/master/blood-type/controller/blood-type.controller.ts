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
import { BloodTypeService } from '../service/blood-type.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { BloodTypePayloadDTO } from '../dto/blood-type.dto';
import {
  bloodTypeUpdateStatusValidation,
  bloodTypeValidation,
} from '../validation/blood-type.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/blood-type')
export class BloodTypeController {
  constructor(private readonly bloodTypeService: BloodTypeService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllBloodType(@Query('keyword') keyword: string) {
    return this.bloodTypeService.finAllBloodType(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createBloodType(
    @Req() req: any,
    @Body(new ZodPipe(bloodTypeValidation)) bloodType: BloodTypePayloadDTO,
  ) {
    return this.bloodTypeService.createBloodType(bloodType, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusBloodType(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(bloodTypeUpdateStatusValidation))
    bloodType: StatusUpdateDTO,
  ) {
    return this.bloodTypeService.updateStatusBloodType(id, bloodType, req);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
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
  async softDeleteBloodType(@Param('id') id: number, @Req() req: any) {
    return this.bloodTypeService.bloodTypeSoftDelete(id, req);
  }
}
