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
import { StructuralPositionService } from '../service/structural-position.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import { StructuralPositionPayloadDTO } from '../dto/structural-position.dto';
import {
  structuralPositionUpdateStatusValidation,
  structuralPositionValidation,
} from '../validation/structural-position.validation';

@Controller('/api/v1/master/structural-position')
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
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
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
  async softDeleteReligion(@Param('id') id: number, @Req() req: any) {
    return this.structuralPositionService.softDeleteStructuralPosition(id, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusReligion(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(structuralPositionUpdateStatusValidation))
    religion: StatusUpdateDTO,
  ) {
    return this.structuralPositionService.updateStatusStructuralPosition(
      id,
      religion,
      req,
    );
  }
}
