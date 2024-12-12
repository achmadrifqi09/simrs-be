import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PatientRepository } from '../repository/patient.repository';
import { LatestRM, PatientDTO } from '../dto/patient.dto';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { SoftDelete } from '../../../common/types/common.type';
import { RegistrationService } from '../../registration/service/registration.service';

@Dependencies([PatientRepository, RegistrationService])
@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly registrationService: RegistrationService,
  ) {}

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

  async findPatientByBPJSNumber(bpjsNumber: string) {
    return this.patientRepository.findPatientByBPJSNumber(bpjsNumber);
  }

  async updatePatient(id: number, patient: PatientDTO, req?: any) {
    if (isNaN(Number(id))) {
      throw new HttpException('Id pasien tidak valid', HttpStatus.BAD_REQUEST);
    }
    patient.modified_at = generateCurrentDate();
    patient.modified_by = req?.user?.id || 0;
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

  async createNewPatient(patient: PatientDTO, queueId: number, req?: any) {
    const registration =
      await this.registrationService.findRegistrationByQueueId(queueId);

    if (!registration) {
      throw new HttpException(
        'Pasien tidak memiliki data pendaftaran',
        HttpStatus.BAD_REQUEST,
      );
    }

    const rmCode = await this.generateRmCode();

    patient = {
      ...patient,
      created_by: req?.user?.id,
      created_at: generateCurrentDate(),
      kode_rm: rmCode,
    };

    const result = await this.patientRepository.createNewPatient(patient);
    if (result) {
      await this.registrationService.updateRMCode(
        registration.id,
        result.kode_rm,
        patient?.no_bpjs,
      );
    }
    return result;
  }

  private async generateRmCode() {
    const patientWithLatestRM: LatestRM =
      await this.patientRepository.findLastedRMCode();
    if (!patientWithLatestRM) {
      return '0000001';
    }
    const rmCode = String(Number(patientWithLatestRM.kode_rm) + 1);
    return rmCode.padStart(7, '0');
  }
}
