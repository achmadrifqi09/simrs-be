import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BedRepository } from '../repository/bed.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { BedPayloadDTO } from '../dto/bed.dto';
import {
  BedAvailabilityDTO,
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([BedRepository])
@Injectable()
export class BedService {
  constructor(private readonly bedRepository: BedRepository) {}

  async findAllBed(
    keyword?: string,
    status?: number,
    bedId?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.bedRepository.findAllBed(
      keyword ?? '',
      status,
      bedId,
      cursor,
      take,
    );
  }

  async createBed(bed: BedPayloadDTO, req: any) {
    bed = {
      nama_bed: bed.nama_bed,
      id_ms_kamar: Number(bed.id_ms_kamar),
      status: isNaN(Number(bed.status)) ? 1 : Number(bed.status),
      status_bed: isNaN(Number(bed.status_bed)) ? 0 : Number(bed.status_bed),
      keterangan: bed.keterangan,
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.bedRepository.createBed(bed);
  }

  async updateBed(id: number, bed: BedPayloadDTO, req: any) {
    bed = {
      nama_bed: bed.nama_bed,
      id_ms_kamar: Number(bed.id_ms_kamar),
      status: isNaN(Number(bed.status)) ? 1 : Number(bed.status),
      status_bed: isNaN(Number(bed.status_bed)) ? 0 : Number(bed.status_bed),
      keterangan: bed.keterangan,
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.bedRepository.updateBed(id, bed);
  }

  async updateStatusBed(id: number, roomType: StatusUpdateDTO, req: any) {
    const payload: StatusUpdateDTO = {
      status: Number(roomType.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.bedRepository.updateStatusBed(id, payload);
  }

  async updateAvailabilityBed(id: number, bed: BedAvailabilityDTO, req: any) {
    const payload: BedAvailabilityDTO = {
      status_bed: Number(bed.status_bed),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.bedRepository.updateBedAvailability(id, payload);
  }

  async softDeleteBed(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.bedRepository.softDeleteBed(id, deletePayload);
  }
}
