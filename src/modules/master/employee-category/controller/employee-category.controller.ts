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
import { TypeOfStatusOfficerService } from '../service/employee-category.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { UpdateStatus } from '../../../../common/types/common.type';
import {
  typeOfStatusOfficerStatusValidation,
  typeOfStatusOfficerValidation,
} from '../validation/employee-category.validation';
import { TypeOfStatusOfficerPayloadDTO } from '../dto/employee-category.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/employee-category')
export class TypeOfStatusOfficerController {
  constructor(
    private readonly typeOfStatusOfficerService: TypeOfStatusOfficerService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllTypeOfStatusOfficer(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.typeOfStatusOfficerService.findAllTypeOfStatusOfficer(
      keyword,
      status,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kategori-pegawai', Action.CAN_CREATE)
  async createTypeOfStatusOfficer(
    @Req() req: any,
    @Body(new ZodPipe(typeOfStatusOfficerValidation))
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
  ) {
    return this.typeOfStatusOfficerService.createTypeOfStatusOfficer(
      typeOfStatusOfficer,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kategori-pegawai', Action.CAN_UPDATE)
  async updateTypeOfStatusOfficer(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(typeOfStatusOfficerValidation))
    typeOfStatusOfficer: TypeOfStatusOfficerPayloadDTO,
  ) {
    return this.typeOfStatusOfficerService.updateTypeOfStatusOfficer(
      id,
      typeOfStatusOfficer,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('kategori-pegawai', Action.CAN_DELETE)
  async softDeleteTypeOfStatusOfficer(
    @Param('id') id: number,
    @Req() req: any,
  ) {
    return this.typeOfStatusOfficerService.softDeleteTypeOfStatusOfficer(
      id,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kategori-pegawai', Action.CAN_UPDATE)
  async updateStatusTypeOfStatusOfficer(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(typeOfStatusOfficerStatusValidation))
    typeOfStatusOfficer: UpdateStatus,
  ) {
    return this.typeOfStatusOfficerService.updateStatusTypeOfStatusOfficer(
      id,
      typeOfStatusOfficer,
      req,
    );
  }
}
