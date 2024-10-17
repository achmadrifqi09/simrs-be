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
  Req, UseGuards,
} from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import { RoomPayloadDTO } from '../dto/room.dto';
import {
  roomStatusValidation,
  roomValidation,
} from '../validation/room.validation';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

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
    room: StatusUpdateDTO,
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
