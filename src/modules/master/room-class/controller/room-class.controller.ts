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
import { RoomClassService } from '../service/room-class.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  roomClassStatusValidation,
  roomClassValidation,
} from '../validation/room-class.validation';
import { RoomClassPayloadDTO } from '../dto/room-class.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/room-class')
export class RoomClassController {
  constructor(private readonly roomClassService: RoomClassService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRoomClass(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.roomClassService.findAllRoomClass(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createRoomClass(
    @Req() req: any,
    @Body(new ZodPipe(roomClassValidation)) roomClass: RoomClassPayloadDTO,
  ) {
    return this.roomClassService.createRoomClass(roomClass, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateRoomClass(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomClassValidation)) roomClass: RoomClassPayloadDTO,
  ) {
    return this.roomClassService.updateRoomClass(id, roomClass, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusRoomClass(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomClassStatusValidation))
    roomClass: StatusUpdateDTO,
  ) {
    return this.roomClassService.updateStatusRoomClass(id, roomClass, req);
  }

  @Delete('/:id')
  async softDeleteRoomClass(@Param('id') id: number, @Req() req: any) {
    return this.roomClassService.softDeleteRoomClass(id, req);
  }
}
