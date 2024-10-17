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
import { RoomService } from '../service/room.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { RoomPayloadDTO } from '../dto/room.dto';
import {
  roomStatusValidation,
  roomValidation,
} from '../validation/room.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRoom(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.roomService.findAllRoom(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createRoom(
    @Req() req: any,
    @Body(new ZodPipe(roomValidation)) room: RoomPayloadDTO,
  ) {
    return this.roomService.createRoom(room, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateRoom(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomValidation)) room: RoomPayloadDTO,
  ) {
    return this.roomService.updateRoom(id, room, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusRoom(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomStatusValidation))
    room: StatusUpdateDTO,
  ) {
    return this.roomService.updateStatusRoom(id, room, req);
  }

  @Delete('/:id')
  async softDeleteRoom(@Param('id') id: number, @Req() req: any) {
    return this.roomService.softDeleteRoom(id, req);
  }
}
