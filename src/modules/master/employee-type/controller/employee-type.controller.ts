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
import { TypeOfEmployeesService } from '../service/employee-type.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  typeOfEmployeesValidation,
  updateTypeOfEmployeesStatusValidation,
} from '../validation/employee-type.validation';
import { TypeOfEmployeesPayloadDTO } from '../dto/employee-type.dto';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/employee-type')
export class TypeOfEmployeesController {
  constructor(
    private readonly typeOfEmployeesService: TypeOfEmployeesService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllTypeOfEmployees(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
    @Query('typeId') typeId: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.typeOfEmployeesService.findAllTypeOfEmployees(
      keyword,
      status,
      typeId,
      cursor,
      take,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('jenis-pegawai', Action.CAN_CREATE)
  async createTypeOfEmployees(
    @Req() req: any,
    @Body(new ZodPipe(typeOfEmployeesValidation))
    typeOfEmployees: TypeOfEmployeesPayloadDTO,
  ) {
    return this.typeOfEmployeesService.createTypeOfEmployees(
      typeOfEmployees,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('jenis-pegawai', Action.CAN_UPDATE)
  async updateTypeOfEmployees(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(typeOfEmployeesValidation))
    typeOfEmployees: TypeOfEmployeesPayloadDTO,
  ) {
    return this.typeOfEmployeesService.updateTypeOfEmployees(
      id,
      typeOfEmployees,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('jenis-pegawai', Action.CAN_UPDATE)
  async updateStatusTypeOfEmployees(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(updateTypeOfEmployeesStatusValidation))
    typeOfEmployees: UpdateStatus,
  ) {
    return this.typeOfEmployeesService.updateStatusTypeOfEmployees(
      id,
      typeOfEmployees,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('jenis-pegawai', Action.CAN_DELETE)
  async softDeleteTypeOfEmployees(@Param('id') id: number, @Req() req: any) {
    return this.typeOfEmployeesService.softDeleteTypeOfEmployees(id, req);
  }
}
