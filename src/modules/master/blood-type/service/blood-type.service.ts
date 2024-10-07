import { Dependencies, Injectable } from '@nestjs/common';
import { BloodTypeRepository } from '../repository/blood-type.respository';
import { BloodTypeDTO, BloodTypePayloadDTO } from '../dto/blood-type.dto';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([BloodTypeRepository])
@Injectable()
export class BloodTypeService {
  constructor(private readonly bloodTypeRepository: BloodTypeRepository) {}

  async createBloodType(bloodType: BloodTypePayloadDTO, req: any) {
    bloodType = {
      ...bloodType,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.bloodTypeRepository.createBloodType(bloodType);
  }

  async updateStatusBloodType(
    id: number,
    bloodType: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(bloodType.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.bloodTypeRepository.updateStatusBloodType(id, payload);
  }

  async updateBloodType(id: number, bloodType: BloodTypePayloadDTO, req: any) {
    const payload: BloodTypePayloadDTO = {
      ...bloodType,
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.bloodTypeRepository.updateBloodType(id, payload);
  }

  async finAllBloodType(keyword?: string) {
    const result = await this.bloodTypeRepository.findAllBloodType(
      keyword || '',
    );

    const bloodTypes: BloodTypeDTO[] = result.map((bloodType) => ({
      id_ms_golongan_darah: bloodType.id_ms_golongan_darah,
      nama_golongan_darah: bloodType.nama_golongan_darah,
      status: bloodType.status,
    }));

    return bloodTypes;
  }

  async bloodTypeSoftDelete(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.bloodTypeRepository.bloodTypeSoftDelete(id, deletePayload);
  }
}
