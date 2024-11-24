import { Dependencies, Injectable } from '@nestjs/common';
import { RegistrationRepository } from '../repository/registration.repository';
import { QueueDto } from '../../queue/dto/queue.dto';
import { RegistrationDto } from '../dto/registration.dto';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { generateUniqueCodeWithDate } from '../../../utils/unique-code-generator';

@Dependencies([RegistrationRepository])
@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async findAllTodayRegistration(
    keyword?: string,
    idUnit?: number,
    idDoctor?: number,
    patientType?: number,
    guarantorType?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.registrationRepository.findAllTodayRegistration(
      cursor,
      take,
      keyword,
      idUnit,
      idDoctor,
      patientType,
      guarantorType,
    );
  }

  async findRegistrationById(id: number) {
    return this.registrationRepository.findRegistrationById(id);
  }

  async createRegistrationFromQueue(queue: QueueDto) {
    const finalPayload: RegistrationDto = {
      kode_rm: queue?.kode_rm || null,
      nomor_registrasi: `${queue.jadwal_dokter.kode_instalasi_bpjs}${generateUniqueCodeWithDate()}`,
      status_batal: 0,
      status_bayar: 0,
      status_bpjs: 0,
      status_inap: 0,
      status_keuangan: 0,
      status_koding: 0,
      tgl_daftar: generateCurrentDate(),
      no_rujukan: queue.no_rujukan || null,
      created_at: generateCurrentDate(),
      created_by: 0,
    };
    await this.registrationRepository.createRegistration(
      Number(queue.id_antrian),
      queue.jenis_penjamin == 2 ? 1 : null,
      finalPayload,
    );
  }
}
