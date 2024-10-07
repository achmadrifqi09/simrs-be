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
  Req,
} from '@nestjs/common';
import { EmployeeStatusService } from '../service/employee-status.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  employeeStatusValidation,
  employeeVisibilityValidation,
} from '../validation/employee-status.validation';
import { EmployeeStatusDTO } from '../dto/employee-status.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Dependencies([EmployeeStatusService])
@Controller('/api/v1/master/employee-status')
export class EmployeeStatusController {
  constructor(private readonly employeeStatusService: EmployeeStatusService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllEmployeeStatus(@Query('keyword') keyword: string) {
    return this.employeeStatusService.findAllEmployeeStatus(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createReligion(
    @Req() req: any,
    @Body(new ZodPipe(employeeStatusValidation))
    employeeStatus: EmployeeStatusDTO,
  ) {
    return this.employeeStatusService.createEmployeeStatus(employeeStatus, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
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
  async softDeleteEmployeeStatus(@Param('id') id: number, @Req() req: any) {
    return this.employeeStatusService.softDeleteEmployeeStatus(id, req);
  }
}
