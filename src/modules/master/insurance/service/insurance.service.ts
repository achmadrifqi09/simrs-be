import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InsuranceRepository } from '../repository/insurance.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { InsuranceDto } from '../dto/insurance.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([InsuranceRepository])
@Injectable()
export class InsuranceService {
  constructor(private readonly insuranceRepository: InsuranceRepository) {}

  async findAllInsurance(keyword?: string, status?: number, isBPJS?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isBPJS && ![0, 1].includes(Number(isBPJS))) {
      throw new HttpException(
        'Format status BPJS tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.insuranceRepository.findAllInsurance(
      keyword ?? '',
      status,
      isBPJS,
    );
  }

  async createInsurance(insurance: InsuranceDto, req: any) {
    insurance = {
      nama_asuransi: insurance.nama_asuransi,
      status: isNaN(Number(insurance.status)) ? 1 : Number(insurance.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.insuranceRepository.createInsurance(insurance);
  }

  async updateInsurance(id: number, insurance: InsuranceDto, req: any) {
    insurance = {
      nama_asuransi: insurance.nama_asuransi,
      status: isNaN(Number(insurance.status)) ? 1 : Number(insurance.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.insuranceRepository.updateInsurance(id, insurance);
  }

  async updateStatusInsurance(id: number, insurance: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(insurance.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.insuranceRepository.updateStatusInsurance(id, payload);
  }

  async softDeleteInsurance(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.insuranceRepository.softDeleteInsurance(id, deletePayload);
  }
}
