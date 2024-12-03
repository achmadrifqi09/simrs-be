import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegistrationFeeService } from '../service/registration-fee.service';
import { RegistrationFee } from '../dto/registration-fee.dto';
import { AccessMenuGuard } from 'src/guards/access-menu/access-menu.guard';
import { Action } from 'src/common/enums/action.enum';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { registrationFeeValidation } from '../validation/registration-fee.validation';
import { ZodPipe } from 'src/pipes/zod-pipe/zod-pipe.pipe';

@Controller({
  path: 'registration-fee',
  version: '1',
})
export class RegistrationFeeController {
  constructor(
    private readonly registrationFeeService: RegistrationFeeService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('pendaftaran-pasien', Action.CAN_CREATE)
  async createRegistrationFee(
    @Req() req: any,
    @Body(new ZodPipe(registrationFeeValidation))
    registrationFee: RegistrationFee,
  ) {
    return this.registrationFeeService.createRegistrationFee(
      registrationFee,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('pendaftaran-pasien', Action.CAN_UPDATE)
  async updateRegistrationFee(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(registrationFeeValidation))
    registrationFee: RegistrationFee,
  ) {
    return this.registrationFeeService.updateRegistrationFee(
      id,
      registrationFee,
      req,
    );
  }
}
