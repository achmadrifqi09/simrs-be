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
import { CounterService } from '../service/counter.service';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { CounterPayloadDTO } from '../dto/counter.dto';
import {
  counterStatusValidation,
  counterValidation,
} from '../validation/counter.validation';
import { UpdateStatus } from '../../../../common/types/common.type';

@Controller('/master/counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllCounter(
    @Query('keyword') keyword: string,
    @Query('type') type: number,
  ) {
    return this.counterService.findCounter(keyword, type);
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  async findCounterById(@Param('id') id: number) {
    return this.counterService.findCounterById(id);
  }

  @Get('/active')
  @Header('Content-Type', 'application/json')
  async findActiveCounterByType(@Param('type') type: number) {
    return this.counterService.findActiveCounterByType(type);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('master-loket-antrean', Action.CAN_CREATE)
  async createCounter(
    @Req() req: any,
    @Body(new ZodPipe(counterValidation)) counter: CounterPayloadDTO,
  ) {
    return this.counterService.createCounter(counter, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('master-loket-antrean', Action.CAN_UPDATE)
  async updateCountry(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(counterValidation)) country: CounterPayloadDTO,
  ) {
    return this.counterService.updateCounter(id, country, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('master-loket-antrean', Action.CAN_UPDATE)
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(counterStatusValidation))
    counter: UpdateStatus,
  ) {
    return this.counterService.updateStatusCounter(id, counter, req);
  }

  @UseGuards(AccessMenuGuard)
  @Permission('master-loket-antrean', Action.CAN_DELETE)
  @Delete('/:id')
  async softDeleteCounter(@Param('id') id: number, @Req() req: any) {
    return this.counterService.softDeleteCounter(id, req);
  }
}
