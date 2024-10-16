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
import { RankOfEmployeesService } from '../service/employee-rank.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import {
  rankOfEmployeesStatusValidation,
  rankOfEmployeesValidation,
} from '../validation/employee-rank.validation';
import { RankOfEmployeesPayloadDTO } from '../dto/employee-rank.dto';

@Controller('/api/v1/master/employee-rank')
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
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
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
  async softDeleteRankOfEmployees(@Param('id') id: number, @Req() req: any) {
    return this.rankOfEmployeesService.softDeleteRankOfEmployees(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusRankOfEmployees(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(rankOfEmployeesStatusValidation))
    rankOfEmployees: StatusUpdateDTO,
  ) {
    return this.rankOfEmployeesService.updateStatusRankOfEmployees(
      id,
      rankOfEmployees,
      req,
    );
  }
}
