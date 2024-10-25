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
import { StructuralPositionService } from '../service/structural-position.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { UpdateStatus } from '../../../../common/types/common.type';
import { StructuralPositionPayloadDTO } from '../dto/structural-position.dto';
import {
  structuralPositionUpdateStatusValidation,
  structuralPositionValidation,
} from '../validation/structural-position.validation';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/structural-position')
export class StructuralPositionController {
  constructor(
    private readonly structuralPositionService: StructuralPositionService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllStructuralPosition(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.structuralPositionService.findAllStructuralPosition(
      keyword,
      status,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('jabatan-struktural', Action.CAN_CREATE)
  async caretStructuralPosition(
    @Req() req: any,
    @Body(new ZodPipe(structuralPositionValidation))
    structuralPosition: StructuralPositionPayloadDTO,
  ) {
    return this.structuralPositionService.createStructuralPosition(
      structuralPosition,
      req,
    );
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('jabatan-struktural', Action.CAN_UPDATE)
  async updateStructuralPosition(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(structuralPositionValidation))
    structuralPosition: StructuralPositionPayloadDTO,
  ) {
    return this.structuralPositionService.updateStructuralPosition(
      id,
      structuralPosition,
      req,
    );
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('jabatan-struktural', Action.CAN_DELETE)
  async softDeleteReligion(@Param('id') id: number, @Req() req: any) {
    return this.structuralPositionService.softDeleteStructuralPosition(id, req);
  }

  @Patch('/:id/status')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('jabatan-struktural', Action.CAN_CREATE)
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(structuralPositionUpdateStatusValidation))
    religion: UpdateStatus,
  ) {
    return this.structuralPositionService.updateStatusStructuralPosition(
      id,
      religion,
      req,
    );
  }
}
