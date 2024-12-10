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
import { InsuranceService } from '../service/insurance.service';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  insuranceStatusValidation,
  insuranceValidation,
} from '../validation/insurance.validation';
import { InsuranceDto } from '../dto/insurance.dto';
import { UpdateStatus } from '../../../../common/types/common.type';

@Controller({
  path: '/master/insurance',
  version: '1',
})
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllInsurance(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
    @Query('is_bpjs') isBPJS: number,
  ) {
    return this.insuranceService.findAllInsurance(keyword, status, isBPJS);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('asuransi', Action.CAN_CREATE)
  async createInsurance(
    @Req() req: any,
    @Body(new ZodPipe(insuranceValidation))
    insurance: InsuranceDto,
  ) {
    return this.insuranceService.createInsurance(insurance, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('asuransi', Action.CAN_UPDATE)
  async updateInsurance(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(insuranceValidation))
    insurance: InsuranceDto,
  ) {
    return this.insuranceService.updateInsurance(id, insurance, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('asuransi', Action.CAN_UPDATE)
  async updateStatusInsurance(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(insuranceStatusValidation))
    insurance: UpdateStatus,
  ) {
    return this.insuranceService.updateStatusInsurance(id, insurance, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('asuransi', Action.CAN_DELETE)
  async softDeleteInsurance(@Param('id') id: number, @Req() req: any) {
    return this.insuranceService.softDeleteInsurance(id, req);
  }
}
