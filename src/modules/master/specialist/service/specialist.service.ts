import { Dependencies, Injectable } from '@nestjs/common';
import { SpecialistRepository } from '../repository/specialist.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { SpecialistPayloadDTO } from '../dto/specialist.dto';

@Dependencies([SpecialistRepository])
@Injectable()
export class SpecialistService {
  constructor(private readonly specialistRepository: SpecialistRepository) {}

  async findAllSpecialist(keyword?: string) {
    return this.specialistRepository.findAllSpecialist(keyword || '');
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
    const deletePayload: SoftDeleteDTO = {
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

  async updateStatusSpecialist(
    id: number,
    specialist: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(specialist.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.specialistRepository.updateStatusSpecialist(id, payload);
  }
}
