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
import { BPJSQueueService } from 'src/modules/bpjs/service/queue.service';
import { AxiosError } from 'axios';

@Dependencies([RegistrationRepository, PrismaService, BPJSQueueService])
@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly prismaService: PrismaService,
    private readonly bpjsQueueService: BPJSQueueService,
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

  async updateRMCode(
    registrationId: number,
    rmCode: string,
    bpjsNumber: string | null,
  ) {
    return this.registrationRepository.updateRMForRegistrationAndQueue(
      registrationId,
      rmCode,
      bpjsNumber,
    );
  }

  async createRegistrationFromQueue(queue: QueueDto) {
    const finalPayload: RegistrationDto = {
      kode_rm: queue?.kode_rm || null,
      nomor_registrasi: `${queue.jadwal_dokter.kode_instalasi_bpjs}${generateUniqueCodeWithDate()}`,
      id_asuransi: queue.jenis_penjamin === 2 ? 1 : null,
      nomor_asuransi: queue.jenis_penjamin === 2 ? queue.no_bpjs : null,
      status_bayar: 0,
      status_bpjs: queue.jenis_penjamin,
      status_inap: 1,
      status_keuangan: 0,
      status_koding: 0,
      status_batal: 0,
      tgl_daftar: generateCurrentDate(),
      no_rujukan: queue.no_rujukan || null,
      created_at: generateCurrentDate(),
      created_by: 0,
    };
    return await this.registrationRepository.createRegistration(
      Number(queue.id_antrian),
      finalPayload,
    );
  }

  async updateCancellationStatus(
    id: number,
    payload: CancellationStatusPayload,
    req: any,
  ) {
    try {
      const registration =
        await this.registrationRepository.findRegistrationById(Number(id));

      if (!registration) {
        throw new HttpException(
          'Data pendaftaran tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(registration.kode_booking);
      const bpjsResponse = await this.bpjsQueueService.queueCancelation({
        kodebooking: registration.kode_booking,
        keterangan: payload.keterangan_batal,
      });

      if (bpjsResponse === 200) {
        payload = {
          ...payload,
          task_id_terakhir: 99,
          modified_at: generateCurrentDate(),
          modified_by: req?.user?.id,
        };
        return await this.registrationRepository.updateCancellationStatus(
          id,
          payload,
        );
      } else {
        throw new HttpException(
          'Terjadi kesalahan saat membatalkan antrean ke BPJS',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error instanceof AxiosError) {
        throw new HttpException(
          error?.message || error,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async updateRegisration(
    id: number,
    payload: RegistrationUpdateDto,
    req: any,
  ) {
    return this.prismaService.$transaction(async (prisma) => {
      const registration =
        await this.registrationRepository.findRegistrationWithDoctorScheduleId(
          Number(id),
        );

      if (!registration) {
        throw new HttpException(
          'Data pendaftaran tidak ditemukan, pastikan pasien mendaftar antrean dihari ini',
          HttpStatus.BAD_REQUEST,
        );
      }
      const totalPolyQueue = await prisma.registration.count({
        where: {
          created_at: {
            gte: generateCurrentDateWithCustomHour('00:00:00'),
            lte: generateCurrentDateWithCustomHour('23:59:59'),
          },
          status_batal: { not: 1 },
          is_deleted: false,
          antrian: {
            jadwal_dokter: {
              id_jadwal_dokter: registration.antrian.id_jadwal_dokter,
            },
          },
          kode_antrian_poli: registration.antrian.kode_antrian,
          nomor_antrian_poli: { not: null },
          id: { not: Number(id) },
        },
      });

      payload.modified_at = generateCurrentDate();
      payload.modified_by = req?.user?.id || 0;
      payload.kode_antrian_poli = registration.antrian.kode_antrian;
      payload.nomor_antrian_poli = totalPolyQueue + 1;
      payload.status_bpjs = Number(payload.id_asuransi) === 1 ? 2 : 1;
      payload.status_inap = 1;
      payload = this.sanitizePayload(payload);
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

  private sanitizePayload(
    payload: RegistrationUpdateDto,
  ): RegistrationUpdateDto {
    Object.keys(payload).forEach((key) => {
      payload[key] =
        typeof payload[key] === 'string' && payload[key] === ' '
          ? undefined
          : payload[key];
    });
    return payload;
  }
}
