import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PatientRepository } from '../repository/patient.repository';
import { PatientDTO } from '../dto/patient.dto';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { SoftDelete } from '../../../common/types/common.type';

@Dependencies([PatientRepository])
@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async findAllPatient(
    keyword?: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.patientRepository.findAllPatient(keyword || '', cursor, take);
  }

  async findFirstPatient(
    identifierNumber: number | string,
    identifierType?: number,
  ) {
    if (identifierType && ![1, 2, 3].includes(Number(identifierType))) {
      throw new HttpException(
        'Jenis nomor pengenal tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!identifierType && isNaN(Number(identifierNumber))) {
      throw new HttpException('Id pasien tidak valid', HttpStatus.BAD_REQUEST);
    }
    return this.patientRepository.findFirstPatient(
      identifierNumber,
      identifierType,
    );
  }

  async updatePatient(id: number, patient: PatientDTO, req: any) {
    if (isNaN(Number(id))) {
      throw new HttpException('Id pasien tidak valid', HttpStatus.BAD_REQUEST);
    }
    patient.modified_at = generateCurrentDate();
    patient.modified_by = req?.user?.id;
    return this.patientRepository.updatePatient(id, patient);
  }

  async softDeletePatient(id: number, req: any) {
    if (isNaN(Number(id))) {
      throw new HttpException('Id pasien tidak valid', HttpStatus.BAD_REQUEST);
    }
    const payload: SoftDelete = {
      deleted_at: generateCurrentDate(),
      deleted_by: req?.user?.id,
      is_deleted: true,
    };
    return this.patientRepository.softDeletePatient(id, payload);
  }
}
