import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CallStatusUpdateInput,
  CallStatusUpdatePayload,
  Identifier,
  PatientQueue,
  QueueAttendancePayload,
  QueueAttendancePayloadInput,
  QueueNumber,
  QueueResponse,
  RegisterQueuePayload,
  StatusPayload,
  StatusPayloadInput,
  UpdateQueueCounterIdPayload,
} from '../dto/queue.dto';
import { DoctorScheduleService } from '../../doctor-schedule/service/doctor-schedule.service';
import { QueueRepository } from '../repository/queue.repository';
import {
  generateCurrentDate,
  generateCurrentDateWithCustomHour,
  generateCustomDate,
} from '../../../utils/date-formatter';
import { PrismaService } from '../../../prisma/prisma.service';
import { QueueServiceHelper } from '../helper/queue-service.helper';
import { VClaimService } from '../../bpjs/service/v-claim.service';
import { PatientReference } from '../../bpjs/dto/v-claim/participant-reference';
import { PatientService } from '../../patient/service/patient.service';
import { PatientDTO } from '../../patient/dto/patient.dto';
import { CallingQueuePayload } from '../../../gateways/admission-queue/type/admission-queue.type';

Dependencies([
  QueueRepository,
  DoctorScheduleService,
  PrismaService,
  QueueServiceHelper,
  VClaimService,
  PatientService,
]);

@Injectable()
export class QueueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly queueRepository: QueueRepository,
    private readonly queueServiceHelper: QueueServiceHelper,
    private readonly vClaimService: VClaimService,
    private readonly patientService: PatientService,
  ) {}

  async findAllQueue(
    keyword?: string,
    fromDate?: string,
    toDate?: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    if (!fromDate && toDate) {
      throw new HttpException(
        'Tanggal akhir harus id tetapkan',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (fromDate && !toDate) {
      throw new HttpException(
        'Tanggal akhir harus id tetapkan',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!fromDate && !toDate) {
      const finalFromDate: Date = generateCustomDate(
        `${new Date().toISOString().split('T')[0]} 00:00:00`,
      );
      const finalToDate: Date = generateCustomDate(
        `${new Date().toISOString().split('T')[0]} 23:59:59`,
      );

      return this.queueRepository.findAllQueue(
        keyword || '',
        finalFromDate,
        finalToDate,
        cursor,
        take,
      );
    }

    if (fromDate && toDate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fromDate)) {
        throw new HttpException(
          'Format tanggal mulai harus yyyy-mm-ddd',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(toDate)) {
        throw new HttpException(
          'Format tanggal akhir harus yyyy-mm-ddd',
          HttpStatus.BAD_REQUEST,
        );
      }
      const finalFromDate = generateCustomDate(`${fromDate} 00:00:00`);
      const finalToDate = generateCustomDate(`${toDate} 23:59:59`);
      return this.queueRepository.findAllQueue(
        keyword || '',
        finalFromDate,
        finalToDate,
        cursor,
        take,
      );
    }
  }

  async findTodayQueueByIdentifierCode(
    identifierCode: string,
    identifierType: number,
  ) {
    const result = await this.queueRepository.findTodayQueueByIdentifierCode(
      identifierCode,
      Number(identifierType),
    );

    if (result) {
      const remainingQueue = await this.queueRepository.findTotalExistingQueue(
        result.no_antrian,
        result.kode_antrian,
      );
      const response: QueueResponse = {
        id_jadwal_dokter: result.jadwal_dokter.id_jadwal_dokter,
        jenis_pasien: result.jenis_pasien,
        jenis_penjamin: result.jenis_penjamin,
        kode_antrian: result.kode_antrian,
        nama_pasien: result.nama_pasien,
        no_antrian: result.no_antrian,
        poliklinik: result.jadwal_dokter.unit.nama_unit_kerja,
        sisa_antrian_onsite: remainingQueue,
        status: result.status,
        status_panggil: result.status_panggil,
        tgl_lahir: result.tgl_lahir,
        created_at: generateCurrentDate(),
        dokter: `${result.jadwal_dokter.pegawai.gelar_depan} ${result.jadwal_dokter.pegawai.nama_pegawai} ${result.jadwal_dokter.pegawai.gelar_belakang}`,
      };
      return response;
    }
    return result;
  }

  async findFirstQueueByCode(queueCode: string) {
    return await this.queueRepository.findFirstQueueByCode(queueCode);
  }

  async findSkippedQueue(counterId: number, queueCode: string) {
    return this.queueRepository.findSkippedQueue(counterId, queueCode);
  }

  async statusUpdate(payload: StatusPayload) {
    const finalPayload: StatusPayloadInput = {
      status: Number(payload.status),
      modified_by: payload.user_id,
      modified_at: generateCurrentDate(),
    };
    return await this.queueRepository.statusUpdate(
      payload.id_antrian,
      finalPayload,
    );
  }

  async queueAttendance(payload: QueueAttendancePayload) {
    const finalPayload: QueueAttendancePayloadInput = {
      status: 1,
      status_panggil: 1,
      tgl_panggil: generateCurrentDate(),
      id_ms_loket_antrian: payload.id_ms_loket_antrian,
      modified_by: payload.user_id,
      modified_at: generateCurrentDate(),
    };
    return await this.queueRepository.queueAttendance(
      payload.id_antrian,
      finalPayload,
    );
  }

  async callStatusUpdate(payload: CallStatusUpdatePayload) {
    const finalPayload: CallStatusUpdateInput = {
      modified_by: payload.user_id,
      id_ms_loket_antrian: payload.id_ms_loket_antrian,
      status_panggil: payload.status_panggil || 0,
      modified_at: generateCurrentDate(),
    };
    return await this.queueRepository.callStatusUpdate(
      payload.id_antrian,
      finalPayload,
    );
  }

  async updateQueueCounterId(payload: CallingQueuePayload) {
    const finalPayload: UpdateQueueCounterIdPayload = {
      id_ms_loket_antrian: payload.id_ms_loket_antrian,
      modified_at: generateCurrentDate(),
      modified_by: payload.user_id,
    };
    const result = await this.queueRepository.updateQueueCounterId(
      payload.id_antrian,
      finalPayload,
    );
    return {
      ...result.loket,
      antrian: [
        {
          id_antrian: result.id_antrian,
          kode_antrian: result.kode_antrian,
          no_antrian: result.no_antrian,
        },
      ],
    };
  }

  async createOldPatientOnsiteQueue(queue: RegisterQueuePayload) {
    if (queue.jenis_pasien !== 1) {
      throw new HttpException(
        'Khusus untuk antrian pasien lama',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.validationPatientHasTakeQueue(queue);
    const identifier: Identifier =
      this.queueServiceHelper.findIdentifierType(queue);
    if (identifier.type === 0) {
      throw new HttpException(
        'Nomor BPJS / kode RM tidak ditemukan',
        HttpStatus.NOT_FOUND,
      );
    }
    const patient = await this.patientService.findFirstPatient(
      identifier.number,
      identifier.type,
    );

    if (!patient) {
      throw new HttpException('Pasien tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    if (patient.kode_rm !== queue.kode_rm) {
      throw new HttpException(
        'Kode RM tidak sama dengan data pasien terkait',
        HttpStatus.BAD_REQUEST,
      );
    }

    const doctorSchedule =
      await this.queueServiceHelper.checkAndGetDoctorSchedule(
        queue.id_jadwal_dokter,
      );
    let patientReference: PatientReference;
    if (Number(queue.jenis_penjamin) === 2) {
      patientReference = await this.vClaimService.findPatientReference(
        queue.no_bpjs,
      );
      if (
        patientReference.rujukan.poliRujukan.kode !==
        doctorSchedule.kode_instalasi_bpjs
      ) {
        throw new HttpException(
          `Poliklinik yang anda pilih tidak sesuai dengan rujukan di BPJS (rujukan BPJS poliklinik ${patientReference.rujukan.poliRujukan.nama})`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (queue.no_bpjs !== patient.no_bpjs) {
        throw new HttpException(
          'Nomor BPJS tidak sama dengan data pasien terkait',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.updatePatientIfItChange(patient, queue);
    return this.prismaService.$transaction(async (prisma) => {
      const totalDoctorQueue = await prisma.queue.count({
        where: {
          created_at: {
            gte: generateCurrentDateWithCustomHour('00:00:00'),
            lte: generateCurrentDateWithCustomHour('23:59:59'),
          },
          id_jadwal_dokter: queue.id_jadwal_dokter,
          status: { not: 2 },
        },
      });

      await this.queueServiceHelper.checkScheduleQuota(
        totalDoctorQueue,
        queue.id_jadwal_dokter,
      );
      const queueNumber: QueueNumber =
        await this.queueServiceHelper.generateQueueNumber(
          doctorSchedule.jam_tutup_praktek,
          Number(queue.jenis_penjamin),
        );
      const onsiteQueueCount =
        await this.queueRepository.findTotalAndRemainingOnsiteQueue(
          queueNumber.kode_antrian,
        );

      const payload: PatientQueue = {
        ...queue,
        id_jadwal_dokter: Number(queue.id_jadwal_dokter),
        kode_antrian: queueNumber.kode_antrian,
        no_antrian: queueNumber.no_antrian,
        no_rujukan: patientReference?.rujukan?.noKunjungan || null,
        status: 0,
        status_panggil: 0,
        created_at: generateCurrentDate(),
      };
      const result =
        await this.queueRepository.createNewPatientOnsiteQueue(payload);
      const response: QueueResponse = {
        ...result,
        sisa_antrian_onsite: Number(onsiteQueueCount.sisa_antrian_onsite),
        dokter: `${doctorSchedule?.pegawai.gelar_depan} ${doctorSchedule.pegawai.nama_pegawai} ${doctorSchedule.pegawai?.gelar_belakang}`,
        poliklinik: doctorSchedule?.unit?.nama_unit_kerja,
      };
      return response;
    });
  }

  async createNewPatientOnsiteQueue(queue: RegisterQueuePayload) {
    if (queue.jenis_pasien !== 2) {
      throw new HttpException(
        'Khusus untuk antrian pasien baru',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.validationPatientHasTakeQueue(queue);
    const doctorSchedule =
      await this.queueServiceHelper.checkAndGetDoctorSchedule(
        queue.id_jadwal_dokter,
      );

    return this.prismaService.$transaction(async (prisma) => {
      const totalDoctorQueue = await prisma.queue.count({
        where: {
          created_at: {
            gte: generateCurrentDateWithCustomHour('00:00:00'),
            lte: generateCurrentDateWithCustomHour('23:59:59'),
          },
          id_jadwal_dokter: queue.id_jadwal_dokter,
          status: { not: 2 },
        },
      });

      await this.queueServiceHelper.checkScheduleQuota(
        totalDoctorQueue,
        queue.id_jadwal_dokter,
      );
      const queueNumber: QueueNumber =
        await this.queueServiceHelper.generateQueueNumber(
          doctorSchedule.jam_tutup_praktek,
          Number(queue.jenis_penjamin),
        );
      const onsiteQueueCount =
        await this.queueRepository.findTotalAndRemainingOnsiteQueue(
          queueNumber.kode_antrian,
        );

      const payload: PatientQueue = {
        ...queue,
        id_jadwal_dokter: Number(queue.id_jadwal_dokter),
        kode_antrian: queueNumber.kode_antrian,
        no_antrian: queueNumber.no_antrian,
        status: 0,
        status_panggil: 0,
        created_at: generateCurrentDate(),
      };
      const result =
        await this.queueRepository.createNewPatientOnsiteQueue(payload);
      const response: QueueResponse = {
        ...result,
        sisa_antrian_onsite: Number(onsiteQueueCount.sisa_antrian_onsite),
        dokter: `${doctorSchedule?.pegawai.gelar_depan} ${doctorSchedule.pegawai.nama_pegawai} ${doctorSchedule.pegawai?.gelar_belakang}`,
        poliklinik: doctorSchedule?.unit?.nama_unit_kerja,
      };
      return response;
    });
  }

  private async validationPatientHasTakeQueue(queue: RegisterQueuePayload) {
    const result = await this.queueRepository.findFirstTodayQueue(queue);
    if (result) {
      throw new HttpException(
        `Pasien terkait telah mengambil antrean, pengambilan hanya dapat dilakukan satu kali dalam sehari`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async updatePatientIfItChange(
    patient: PatientDTO,
    queue: RegisterQueuePayload,
  ) {
    let isChange = false;
    if (patient.nama_pasien !== queue.nama_pasien) {
      patient.nama_pasien = queue.nama_pasien;
      isChange = true;
    }
    if (patient.no_hp !== queue.no_hp) {
      patient.no_hp = queue.no_hp;
      isChange = true;
    }
    if (patient.tgl_lahir.toISOString() !== queue.tgl_lahir.toISOString()) {
      patient.tgl_lahir = queue.tgl_lahir;
      isChange = true;
    }

    if (isChange) {
      await this.patientService.updatePatient(patient.id_pasien, patient);
    }
  }
}
