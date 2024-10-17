import {
  Body,
  Controller,
  Delete,
  Dependencies,
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
import { EmployeeStatusService } from '../service/employee-status.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  employeeStatusValidation,
  employeeVisibilityValidation,
} from '../validation/employee-status.validation';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Dependencies([EmployeeStatusService])
@Controller('/api/v1/master/employee-status')
export class EmployeeStatusController {
  constructor(private readonly employeeStatusService: EmployeeStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllEmployeeStatus(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.employeeStatusService.findAllEmployeeStatus(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('status-pegawai', Action.CAN_CREATE)
  async createReligion(
    @Req() req: any,
    @Body(new ZodPipe(employeeStatusValidation))
    employeeStatus: EmployeeStatusDTO,
  ) {
    return this.employeeStatusService.createEmployeeStatus(employeeStatus, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('status-pegawai', Action.CAN_UPDATE)
  async updateEmployeeStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(employeeStatusValidation))
    employeeStatus: EmployeeStatusDTO,
  ) {
    return this.employeeStatusService.updateEmployeeStatus(
      id,
      employeeStatus,
      req,
    );
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('status-pegawai', Action.CAN_UPDATE)
  async updateVisibilityEmployeeStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(employeeVisibilityValidation))
    employeeStatus: StatusUpdateDTO,
  ) {
    return this.employeeStatusService.updateVisibilityEmployeeStatus(
      id,
      employeeStatus,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('status-pegawai', Action.CAN_DELETE)
  async softDeleteEmployeeStatus(@Param('id') id: number, @Req() req: any) {
    return this.employeeStatusService.softDeleteEmployeeStatus(id, req);
  }
}
