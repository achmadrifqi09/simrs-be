import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RoomRepository } from '../repository/room.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { RoomPayloadDTO } from '../dto/room.dto';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';

@Dependencies([RoomRepository])
@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findAllRoom(
    keyword?: string,
    status?: number,
    roomId?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.roomRepository.findAllRoom(
      keyword ?? '',
      status,
      roomId,
      cursor,
      take,
    );
  }

  async createRoom(room: RoomPayloadDTO, req: any) {
    room = {
      nama_kamar: room.nama_kamar,
      id_ms_kamar_jenis: Number(room.id_ms_kamar_jenis),
      id_gedung: Number(room.id_gedung),
      lantai: Number(room.lantai),
      status: isNaN(Number(room.status)) ? 1 : Number(room.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.roomRepository.createRoom(room);
  }

  async updateRoom(id: number, room: RoomPayloadDTO, req: any) {
    room = {
      nama_kamar: room.nama_kamar,
      id_ms_kamar_jenis: Number(room.id_ms_kamar_jenis),
      id_gedung: Number(room.id_gedung),
      lantai: Number(room.lantai),
      status: isNaN(Number(room.status)) ? 1 : Number(room.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomRepository.updateRoom(id, room);
  }

  async updateStatusRoom(id: number, roomType: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(roomType.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomRepository.updateStatusRoom(id, payload);
  }

  async softDeleteRoom(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.roomRepository.softDeleteRoom(id, deletePayload);
  }
}
