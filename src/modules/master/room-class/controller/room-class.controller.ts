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
import { RoomClassService } from '../service/room-class.service';
import { ZodPipe } from '../../../../pipes/zod-pipe/zod-pipe.pipe';
import {
  roomClassStatusValidation,
  roomClassValidation,
} from '../validation/room-class.validation';
import { RoomClassPayloadDTO } from '../dto/room-class.dto';
import { UpdateStatus } from '../../../../common/types/common.type';
import { AccessMenuGuard } from '../../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../../decorators/permission/permission.decorator';
import { Action } from '../../../../common/enums/action.enum';

@Controller('/master/room-class')
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
  @UseGuards(AccessMenuGuard)
  @Permission('kelas-kamar', Action.CAN_CREATE)
  async createRoomClass(
    @Req() req: any,
    @Body(new ZodPipe(roomClassValidation)) roomClass: RoomClassPayloadDTO,
  ) {
    return this.roomClassService.createRoomClass(roomClass, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @UseGuards(AccessMenuGuard)
  @Permission('kelas-kamar', Action.CAN_UPDATE)
  async updateRoomClass(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomClassValidation)) roomClass: RoomClassPayloadDTO,
  ) {
    return this.roomClassService.updateRoomClass(id, roomClass, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessMenuGuard)
  @Permission('kelas-kamar', Action.CAN_UPDATE)
  async updateStatusRoomClass(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomClassStatusValidation))
    roomClass: UpdateStatus,
  ) {
    return this.roomClassService.updateStatusRoomClass(id, roomClass, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('kelas-kamar', Action.CAN_DELETE)
  async softDeleteRoomClass(@Param('id') id: number, @Req() req: any) {
    return this.roomClassService.softDeleteRoomClass(id, req);
  }
}
