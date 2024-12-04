import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegistrationRepository } from '../repository/registration.repository';
import { QueueDto } from '../../queue/dto/queue.dto';
import {
  CancellationStatusPayload,
  RegistrationDto,
  RegistrationUpdateDto,
} from '../dto/registration.dto';
import {
  generateCurrentDate,
  generateCurrentDateWithCustomHour,
} from '../../../utils/date-formatter';
import { generateUniqueCodeWithDate } from '../../../utils/unique-code-generator';
import { PrismaService } from 'src/prisma/prisma.service';

@Dependencies([RegistrationRepository, PrismaService])
@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly prismaService: PrismaService,
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

  async findRegistrationByQueueId(queueId: number) {
    return this.registrationRepository.findRegistrationByQueueId(queueId);
  }

  async updateRMCode(registrationId: number, rmCode: string) {
    return this.registrationRepository.updateRMForRegistrationAndQueue(
      registrationId,
      rmCode,
    );
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

  async updateCancellationStatus(
    id: number,
    payload: CancellationStatusPayload,
    req: any,
  ) {
    payload = {
      ...payload,
      modified_at: generateCurrentDate(),
      modified_by: req?.user?.id,
    };
    return await this.registrationRepository.updateCancellationStatus(
      id,
      payload,
    );
  }

  async updateRegisration(
    id: number,
    payload: RegistrationUpdateDto,
    req: any,
  ) {
    if (![1, 2, 3].includes(Number(payload.status_bpjs))) {
      throw new HttpException(
        'Status BPJS tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (![1, 2, 3].includes(Number(payload.status_inap))) {
      throw new HttpException(
        'Status inap tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prismaService.$transaction(async (prisma) => {
      const registration =
        await this.registrationRepository.findRegisrationWithDoctorScheduleId(
          Number(id),
        );

      if (!registration) {
        throw new HttpException(
          'Data pendaftaran tidak ditemukan, pastikan pasien mendaftar antrean dihari ini',
          HttpStatus.BAD_REQUEST,
        );
      }
      const totalPolyQueue = await prisma.queue.count({
        where: {
          created_at: {
            gte: generateCurrentDateWithCustomHour('00:00:00'),
            lte: generateCurrentDateWithCustomHour('23:59:59'),
          },
          status: { not: 2 },
          is_deleted: false,
          jadwal_dokter: {
            id_jadwal_dokter: Number(registration.antrian.id_jadwal_dokter),
          },
          id_antrian: { not: registration.antrian.id_antrian },
        },
      });

      payload.modified_at = generateCurrentDate();
      payload.modified_by = req?.user?.id || 0;
      payload.kode_antrian_poli = registration.antrian.kode_antrian;
      payload.nomor_antrian_poli = totalPolyQueue + 1;

      const result = await this.registrationRepository.updateRegistration(
        id,
        payload,
      );
      return {
        ...result,
        antrian: { ...registration.antrian },
      };
    });
  }
}
