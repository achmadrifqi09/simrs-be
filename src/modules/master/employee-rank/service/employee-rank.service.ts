import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RankOfEmployeesRepository } from '../repository/employee-rank.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { RankOfEmployeesPayloadDTO } from '../dto/employee-rank.dto';

@Dependencies([RankOfEmployeesRepository])
@Injectable()
export class RankOfEmployeesService {
  constructor(
    private readonly rankOfEmployeesRepository: RankOfEmployeesRepository,
  ) {}

  async findAllRankOfEmployees(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.rankOfEmployeesRepository.findAllRankOfEmployees(
      keyword ?? '',
      status,
    );
  }

  async createRankOfEmployees(
    rankOfEmployees: RankOfEmployeesPayloadDTO,
    req: any,
  ) {
    rankOfEmployees = {
      nama_pangkat: rankOfEmployees.nama_pangkat,
      status: isNaN(Number(rankOfEmployees.status))
        ? 1
        : Number(rankOfEmployees.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.rankOfEmployeesRepository.createRankOfEmployees(
      rankOfEmployees,
    );
  }

  async softDeleteRankOfEmployees(id: number, req: any) {
    const deletePayload: SoftDeleteDTO = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.rankOfEmployeesRepository.softDeleteRankOfEmployees(
      id,
      deletePayload,
    );
  }

  async updateRankOfEmployees(
    id: number,
    rankOfEmployees: RankOfEmployeesPayloadDTO,
    req: any,
  ) {
    rankOfEmployees = {
      nama_pangkat: rankOfEmployees.nama_pangkat,
      status: isNaN(Number(rankOfEmployees.status))
        ? 1
        : Number(rankOfEmployees.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.rankOfEmployeesRepository.updateRankOfEmployees(
      id,
      rankOfEmployees,
    );
  }

  async updateStatusRankOfEmployees(
    id: number,
    rankOfEmployees: StatusUpdateDTO,
    req: any,
  ) {
    const payload: StatusUpdateDTO = {
      status: Number(rankOfEmployees.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.rankOfEmployeesRepository.updateStatusRankOfEmployees(
      id,
      payload,
    );
  }
}
