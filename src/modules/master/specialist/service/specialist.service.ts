import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SpecialistRepository } from '../repository/specialist.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';

@Dependencies([SpecialistRepository])
@Injectable()
export class SpecialistService {
  constructor(private readonly specialistRepository: SpecialistRepository) {}

  async findAllSpecialist(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.specialistRepository.findAllSpecialist(keyword ?? '', status);
  }

  async createSpecialist(specialist: SpecialistPayloadDTO, req: any) {
    specialist = {
      nama_spesialis: specialist.nama_spesialis,
      status: isNaN(Number(specialist.status)) ? 1 : Number(specialist.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.specialistRepository.createSpecialist(specialist);
  }

  async softDeleteSpecialist(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.specialistRepository.softDeleteSpecialist(id, deletePayload);
  }

  async updateSpecialist(
    id: number,
    specialist: SpecialistPayloadDTO,
    req: any,
  ) {
    specialist = {
      nama_spesialis: specialist.nama_spesialis,
      status: isNaN(Number(specialist.status)) ? 1 : Number(specialist.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.specialistRepository.updateSpecialist(id, specialist);
  }

  async updateStatusSpecialist(id: number, specialist: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(specialist.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.specialistRepository.updateStatusSpecialist(id, payload);
  }
}
