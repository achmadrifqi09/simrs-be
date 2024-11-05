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
import { RankOfEmployeesService } from '../service/employee-rank.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { UpdateStatus } from '../../../../common/types/common.type';
import {
  rankOfEmployeesStatusValidation,
  rankOfEmployeesValidation,
} from '../validation/employee-rank.validation';
import { RankOfEmployeesPayloadDTO } from '../dto/employee-rank.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller({
  path: '/master/employee-rank',
  version: '1',
})
export class RankOfEmployeesController {
  constructor(
    private readonly rankOfEmployeesService: RankOfEmployeesService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRankOfEmployees(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.rankOfEmployeesService.findAllRankOfEmployees(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('pangkat-golongan', Action.CAN_CREATE)
  async createRankOfEmployees(
    @Req() req: any,
    @Body(new ZodPipe(rankOfEmployeesValidation))
    rankOfEmployees: RankOfEmployeesPayloadDTO,
  ) {
    return this.rankOfEmployeesService.createRankOfEmployees(
      rankOfEmployees,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('pangkat-golongan', Action.CAN_UPDATE)
  async updateRankOfEmployees(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(rankOfEmployeesValidation))
    rankOfEmployees: RankOfEmployeesPayloadDTO,
  ) {
    return this.rankOfEmployeesService.updateRankOfEmployees(
      id,
      rankOfEmployees,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('pangkat-golongan', Action.CAN_DELETE)
  async softDeleteRankOfEmployees(@Param('id') id: number, @Req() req: any) {
    return this.rankOfEmployeesService.softDeleteRankOfEmployees(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('pangkat-golongan', Action.CAN_UPDATE)
  async updateStatusRankOfEmployees(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(rankOfEmployeesStatusValidation))
    rankOfEmployees: UpdateStatus,
  ) {
    return this.rankOfEmployeesService.updateStatusRankOfEmployees(
      id,
      rankOfEmployees,
      req,
    );
  }
}
