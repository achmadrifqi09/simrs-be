import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RoomTypeRepository } from '../repository/room-type.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { RoomTypePayloadDTO } from '../dto/room-type.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([RoomTypeRepository])
@Injectable()
export class RoomTypeService {
  constructor(private readonly roomTypeRepository: RoomTypeRepository) {}

  async findAllRoomType(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.roomTypeRepository.findAllRoomType(keyword ?? '', status);
  }

  async createRoomType(roomType: RoomTypePayloadDTO, req: any) {
    roomType = {
      nama_jenis_kamar: roomType.nama_jenis_kamar,
      id_kelas_kamar: Number(roomType.id_kelas_kamar),
      status: isNaN(Number(roomType.status)) ? 1 : Number(roomType.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.roomTypeRepository.createRoomType(roomType);
  }

  async updateRoomType(id: number, roomType: RoomTypePayloadDTO, req: any) {
    roomType = {
      nama_jenis_kamar: roomType.nama_jenis_kamar,
      id_kelas_kamar: Number(roomType.id_kelas_kamar),
      status: isNaN(Number(roomType.status)) ? 1 : Number(roomType.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomTypeRepository.updateRoomType(id, roomType);
  }

  async updateStatusRoomType(id: number, roomType: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(roomType.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomTypeRepository.updateStatusRoomType(id, payload);
  }

  async softDeleteRoomType(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.roomTypeRepository.softDeleteRoomType(id, deletePayload);
  }
}
