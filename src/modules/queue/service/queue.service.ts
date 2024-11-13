import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  NewPatient,
  NewPatientPayload,
  ResponseNewPatient,
} from '../dto/queue.dto';
import { DoctorScheduleService } from '../../doctor-schedule/service/doctor-schedule.service';
import { QueueRepository } from '../repository/queue.repository';
import {
  generateCurrentDate,
  generateCurrentDateWithCustomHour,
} from '../../../utils/date-formatter';
import { PrismaService } from '../../../prisma/prisma.service';
import { QueueServiceHelper } from '../helper/queue-service.helper';

Dependencies([
  QueueRepository,
  DoctorScheduleService,
  PrismaService,
  QueueServiceHelper,
]);

@Injectable()
export class QueueService {
  constructor(
    private readonly queueRepository: QueueRepository,
    private readonly doctorScheduleService: DoctorScheduleService,
    private readonly prismaService: PrismaService,
    private readonly queueServiceHelper: QueueServiceHelper,
  ) {}

  async createNewPatientOnsiteQueue(queue: NewPatientPayload) {
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
      const scheduleQuota = await this.doctorScheduleService.findScheduleQuota(
        queue.id_jadwal_dokter,
      );

      if (totalDoctorQueue >= Number(scheduleQuota.kuota_onsite)) {
        throw new HttpException('Kuota dokter penuh', HttpStatus.BAD_REQUEST);
      }

      const queueCode = this.queueServiceHelper.generateOnsiteQueueCode(
        doctorSchedule.jam_tutup_praktek,
        Number(queue.jenis_penjamin),
      );

      const onsiteQueueCount =
        await this.queueRepository.findTotalAndRemainingOnsiteQueue(queueCode);

      const queueNumber =
        Number(onsiteQueueCount.jumlah_antrian_onsite) === 0
          ? 1
          : Number(onsiteQueueCount.jumlah_antrian_onsite) + 1;

      const payload: NewPatient = {
        ...queue,
        id_jadwal_dokter: Number(queue.id_jadwal_dokter),
        kode_antrian: queueCode,
        no_antrian: queueNumber,
        status: 0,
        status_panggil: 0,
        created_at: generateCurrentDate(),
      };
      const result =
        await this.queueRepository.createNewPatientOnsiteQueue(payload);
      const response: ResponseNewPatient = {
        ...result,
        sisa_antrian_onsite: Number(onsiteQueueCount.sisa_antrian_onsite),
        dokter: `${doctorSchedule?.pegawai.gelar_depan} ${doctorSchedule.pegawai.nama_pegawai} ${doctorSchedule.pegawai?.gelar_belakang}`,
        poliklinik: doctorSchedule?.unit?.nama_unit_kerja,
      };
      return response;
    });
  }
}
