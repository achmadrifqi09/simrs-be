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
import { RoomTypeService } from '../service/room-type.service';
import { ZodPipe } from '../../../../zod-pipe/zod-pipe.pipe';
import {
  roomTypeStatusValidation,
  roomTypeValidation,
} from '../validation/room-type.validation';
import { RoomTypePayloadDTO } from '../dto/room-type.dto';
import { StatusUpdateDTO } from '../../../../common/dto/common.dto';

@Controller('/api/v1/master/room-type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllRoomType(
    @Query('keyword') keyword: string,
    @Query('status') status: number,
  ) {
    return this.roomTypeService.findAllRoomType(keyword, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createRoomType(
    @Req() req: any,
    @Body(new ZodPipe(roomTypeValidation)) roomType: RoomTypePayloadDTO,
  ) {
    return this.roomTypeService.createRoomType(roomType, req);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async updateRoomType(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomTypeValidation)) roomType: RoomTypePayloadDTO,
  ) {
    return this.roomTypeService.updateRoomType(id, roomType, req);
  }

  @Patch('/:id/status')
  @Header('Content-Type', 'application/json')
  async updateStatusRoomType(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(roomTypeStatusValidation))
    roomType: StatusUpdateDTO,
  ) {
    return this.roomTypeService.updateStatusRoomType(id, roomType, req);
  }

  @Delete('/:id')
  async softDeleteRoomType(@Param('id') id: number, @Req() req: any) {
    return this.roomTypeService.softDeleteRoomType(id, req);
  }
}
