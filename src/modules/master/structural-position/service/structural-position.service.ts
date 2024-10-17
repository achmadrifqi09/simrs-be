import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { StructuralPositionRepository } from '../repository/structural-position.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { StructuralPositionPayloadDTO } from '../dto/structural-position.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([StructuralPositionRepository])
@Injectable()
export class StructuralPositionService {
  constructor(
    private readonly structuralPositionRepository: StructuralPositionRepository,
  ) {}

  async findAllStructuralPosition(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.structuralPositionRepository.findAllStructuralPosition(
      keyword ?? '',
      status,
    );
  }

  async createStructuralPosition(
    structuralPosition: StructuralPositionPayloadDTO,
    req: any,
  ) {
    structuralPosition = {
      nama_jabatan: structuralPosition.nama_jabatan,
      status: Number(structuralPosition.status)
        ? 1
        : Number(structuralPosition.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.structuralPositionRepository.createStructuralPosition(
      structuralPosition,
    );
  }

  async updateStructuralPosition(
    id: number,
    structuralPosition: StructuralPositionPayloadDTO,
    req: any,
  ) {
    structuralPosition = {
      nama_jabatan: structuralPosition.nama_jabatan,
      status: isNaN(Number(structuralPosition.status))
        ? 1
        : Number(structuralPosition.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.structuralPositionRepository.updateStructuralPosition(
      id,
      structuralPosition,
    );
  }

  async updateStatusStructuralPosition(
    id: number,
    bloodType: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(bloodType.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.structuralPositionRepository.updateStatusStructuralPosition(
      id,
      payload,
    );
  }

  async softDeleteStructuralPosition(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.structuralPositionRepository.softDeleteStructuralPosition(
      id,
      deletePayload,
    );
  }
}
