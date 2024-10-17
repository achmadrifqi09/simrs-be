import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BuildingRepository } from '../repository/building.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { BuildingPayloadDTO } from '../dto/building.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([BuildingRepository])
@Injectable()
export class BuildingService {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  async findAllBuilding(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.buildingRepository.findAllBuilding(keyword ?? '', status);
  }

  async createBuilding(building: BuildingPayloadDTO, req: any) {
    building = {
      nama_gedung: building.nama_gedung,
      status: isNaN(Number(building.status)) ? 1 : Number(building.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.buildingRepository.createBuilding(building);
  }

  async updateBuilding(id: number, building: BuildingPayloadDTO, req: any) {
    building = {
      nama_gedung: building.nama_gedung,
      status: isNaN(Number(building.status)) ? 1 : Number(building.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.buildingRepository.updateBuilding(id, building);
  }

  async updateStatusBuilding(id: number, building: StatusUpdateDTO, req: any) {
    const payload: StatusUpdateDTO = {
      status: Number(building.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.buildingRepository.updateStatusBuilding(id, payload);
  }

  async softDeleteBuilding(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.buildingRepository.softDeleteBuilding(id, deletePayload);
  }
}
