import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RoomClassRepository } from '../repository/room-class.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { RoomClassPayloadDTO } from '../dto/room-class.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([RoomClassRepository])
@Injectable()
export class RoomClassService {
  constructor(private readonly roomClassRepository: RoomClassRepository) {}

  async findAllRoomClass(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.roomClassRepository.findAllRoomClass(keyword ?? '', status);
  }

  async createRoomClass(roomClass: RoomClassPayloadDTO, req: any) {
    roomClass = {
      nama_kelas_kamar: roomClass.nama_kelas_kamar,
      kode_bpjs_kamar: roomClass.kode_bpjs_kamar,
      status: isNaN(Number(roomClass.status)) ? 1 : Number(roomClass.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.roomClassRepository.createRoomClass(roomClass);
  }

  async updateRoomClass(id: number, roomClass: RoomClassPayloadDTO, req: any) {
    roomClass = {
      nama_kelas_kamar: roomClass.nama_kelas_kamar,
      kode_bpjs_kamar: roomClass.kode_bpjs_kamar,
      status: isNaN(Number(roomClass.status)) ? 1 : Number(roomClass.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomClassRepository.updateRoomClass(id, roomClass);
  }

  async updateStatusRoomClass(id: number, roomClass: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(roomClass.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.roomClassRepository.updateStatusRoomClass(id, payload);
  }

  async softDeleteRoomClass(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.roomClassRepository.softDeleteRoomClass(id, deletePayload);
  }
}
