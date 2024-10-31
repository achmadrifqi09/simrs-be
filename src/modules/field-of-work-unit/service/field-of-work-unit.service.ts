import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FieldOfWorkUnitRepository } from '../repository/field-of-work-unit.repository';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { FieldOfWorkUnit } from '../dto/field-of-work-unit.dto';
import { SoftDelete, UpdateStatus } from '../../../common/types/common.type';

@Dependencies([FieldOfWorkUnitRepository])
@Injectable()
export class FieldOfWorkUnitService {
  constructor(
    private readonly fieldOfWorkUnitRepository: FieldOfWorkUnitRepository,
  ) {}

  async findFieldOfWorkUnit(keyword?: string, status?: number) {
    if (!Number(status) && !(status in [0, 1]) && status !== undefined) {
      throw new HttpException(
        'Status bindang unit kerja tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.fieldOfWorkUnitRepository.findFieldOfWorkUnit(
      keyword || '',
      status,
    );
  }

  async createFieldOfWorkUnit(fieldOfWorkUnit: FieldOfWorkUnit, req: any) {
    fieldOfWorkUnit = {
      nama_bidang: fieldOfWorkUnit.nama_bidang,
      status: isNaN(Number(fieldOfWorkUnit.status))
        ? 1
        : Number(fieldOfWorkUnit.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.fieldOfWorkUnitRepository.createFieldOfWorkUnit(
      fieldOfWorkUnit,
    );
  }

  async updateFieldOfWorkUnit(
    id: number,
    fieldOfWorkUnit: FieldOfWorkUnit,
    req: any,
  ) {
    fieldOfWorkUnit = {
      nama_bidang: fieldOfWorkUnit.nama_bidang,
      status: isNaN(Number(fieldOfWorkUnit.status))
        ? 1
        : Number(fieldOfWorkUnit.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.fieldOfWorkUnitRepository.updateFieldOfWorkUnit(
      id,
      fieldOfWorkUnit,
    );
  }

  async updateFieldOfWorkUnitStatus(
    id: number,
    fieldOfWorkUnit: UpdateStatus,
    req: any,
  ) {
    fieldOfWorkUnit = {
      status: isNaN(Number(fieldOfWorkUnit.status))
        ? 1
        : Number(fieldOfWorkUnit.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.fieldOfWorkUnitRepository.updateFieldOfWorkUnitStatus(
      id,
      fieldOfWorkUnit,
    );
  }

  async softDeleteFieldOfWorkUnit(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.fieldOfWorkUnitRepository.softDeleteFieldOfWorkUnit(
      id,
      deletePayload,
    );
  }
}
