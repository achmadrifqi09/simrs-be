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
import { RoomService } from '../service/room.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import { RoomPayloadDTO } from '../dto/room.dto';
import {
  roomStatusValidation,
  roomValidation,
} from '../validation/room.validation';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRoom(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
    @Query('roomId') roomId: number,
    @Query('cursor') cursor: number,
    @Query('take') take: number,
  ) {
    return this.roomService.findAllRoom(keyword, status, roomId, cursor, take);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_CREATE)
  async createRoom(
    @Req() req: any,
    @Body(new ZodPipe(roomValidation)) room: RoomPayloadDTO,
  ) {
    return this.roomService.createRoom(room, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_UPDATE)
  async updateRoom(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomValidation)) room: RoomPayloadDTO,
  ) {
    return this.roomService.updateRoom(id, room, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_UPDATE)
  async updateStatusRoom(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomStatusValidation))
    room: UpdateStatus,
  ) {
    return this.roomService.updateStatusRoom(id, room, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('kamar-dan-bed', Action.CAN_DELETE)
  async softDeleteRoom(@Param('id') id: number, @Req() req: any) {
    return this.roomService.softDeleteRoom(id, req);
  }
}
