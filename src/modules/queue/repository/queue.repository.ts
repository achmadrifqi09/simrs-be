import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { generateDateString } from '../../../utils/date-generator';
import {
  CallStatusUpdate,
  CounterIdUpdatePayload,
  DailyQueueSummary,
  PatientQueue,
  QueueAttendancePayloadInput,
  RegisterQueuePayload,
  StatusPayloadInput,
} from '../dto/queue.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { bigIntReplacer } from '../../../utils/helper';
import { generateCurrentDateWithCustomHour } from '../../../utils/date-formatter';
import { counterQueue } from '../const/queue.const';

@Dependencies([PrismaService])
@Injectable()
export class QueueRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findRemainingQueueCode(queueCode: string) {
    return this.prismaService.queue.count({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        kode_antrian: queueCode,
        status: { not: 2 },
        status_panggil: 0,
        id_ms_loket_antrian: null,
      },
    });
  }

  async findPendingQueueById(queueId: number) {
    return this.prismaService.queue.findFirst({
      where: {
        id_antrian: Number(queueId),
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        status: { not: 2 },
        OR: [{ status_panggil: 0 }, { status_panggil: null }],
      },
      select: counterQueue,
    });
  }

  async updateCounterId(id: number, payload: CounterIdUpdatePayload) {
    return this.prismaService.queue.update({
      where: { id_antrian: Number(id) },
      data: payload,
      select: counterQueue,
    });
  }

  async findNextQueueId(queueCode: string) {
    return this.prismaService.queue.findFirst({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        kode_antrian: queueCode,
        status: { not: 2 },
        status_panggil: 0,
        id_ms_loket_antrian: null,
      },
      select: {
        id_antrian: true,
      },
    });
  }

  async callStatusUpdate(queueId: number, payload: CallStatusUpdate) {
    return this.prismaService.queue.update({
      where: {
        id_antrian: Number(queueId),
      },
      data: payload,
      select: counterQueue,
    });
  }

  async findAllQueue(
    keyword?: string,
    fromDate?: Date,
    toDate?: Date,
    cursor: number = 0,
    take: number = 10,
    guarantorType?: number,
  ) {
    const whereClause: Prisma.QueueWhereInput = {
      created_at: {
        gte: fromDate,
        lte: toDate,
      },
      is_deleted: false,
    };

    if (/^[a-zA-Z\s]+$/.test(keyword) && keyword !== '') {
      whereClause.OR = [{ nama_pasien: { contains: keyword } }];
    }

    if (!/^[a-zA-Z\s]+$/.test(keyword) && keyword !== '') {
      whereClause.OR = [
        { no_rujukan: { contains: keyword } },
        { no_bpjs: { contains: keyword } },
        { kode_rm: { contains: keyword } },
      ];
    }

    if (Number(guarantorType)) {
      whereClause.jenis_penjamin = Number(guarantorType);
    }

    const result = await this.prismaService.queue.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      select: {
        id_antrian: true,
        status_panggil: true,
        kode_rm: true,
        no_hp: true,
        no_bpjs: true,
        no_rujukan: true,
        jadwal_dokter: {
          select: {
            id_jadwal_dokter: true,
            kode_instalasi_bpjs: true,
            jam_tutup_praktek: true,
            jam_buka_praktek: true,
            pegawai: {
              select: {
                gelar_depan: true,
                gelar_belakang: true,
                nama_pegawai: true,
              },
            },
          },
        },
        jenis_pasien: true,
        jenis_penjamin: true,
        nama_pasien: true,
        kode_antrian: true,
        no_antrian: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
  }

  async findTodayQueueByIdentifierCode(
    identifierCode: string,
    identifierType: number | undefined,
  ) {
    const whereClause: Prisma.QueueWhereInput = {
      created_at: {
        gte: generateCurrentDateWithCustomHour('00:00:00'),
        lte: generateCurrentDateWithCustomHour('23:59:59'),
      },
      status: { not: 2 },
      tgl_panggil: null,
      status_panggil: { not: 1 },
    };

    if (!identifierType || identifierType == 1)
      whereClause.kode_rm = identifierCode;
    if (identifierType === 2) whereClause.no_bpjs = identifierCode;
    if (identifierType === 3) whereClause.no_rujukan = identifierCode;
    if (identifierType === 4) whereClause.no_hp = identifierCode;

    return this.prismaService.queue.findFirst({
      where: whereClause,
      select: {
        jadwal_dokter: {
          select: {
            id_jadwal_dokter: true,
            pegawai: {
              select: {
                gelar_depan: true,
                gelar_belakang: true,
                nama_pegawai: true,
              },
            },
            unit: {
              select: {
                nama_unit_kerja: true,
              },
            },
          },
        },
        nama_pasien: true,
        jenis_pasien: true,
        jenis_penjamin: true,
        no_bpjs: true,
        id_jadwal_dokter: true,
        tgl_lahir: true,
        kode_antrian: true,
        no_antrian: true,
        status: true,
        status_panggil: true,
      },
    });
  }

  async findFirstQueueByCode(queueCode: string) {
    return this.prismaService.queue.findFirst({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        status: { not: 2 },
        OR: [{ status_panggil: 0 }, { status_panggil: null }],
        is_deleted: false,
        id_ms_loket_antrian: null,
        kode_antrian: queueCode,
      },
      select: {
        id_antrian: true,
        status_panggil: true,
        id_ms_loket_antrian: true,
        jadwal_dokter: {
          select: {
            id_jadwal_dokter: true,
            kode_instalasi_bpjs: true,
            jam_tutup_praktek: true,
            jam_buka_praktek: true,
            pegawai: {
              select: {
                gelar_depan: true,
                gelar_belakang: true,
                nama_pegawai: true,
              },
            },
          },
        },
        jenis_pasien: true,
        jenis_penjamin: true,
        nama_pasien: true,
        kode_antrian: true,
        no_antrian: true,
      },
      orderBy: {
        no_antrian: 'asc',
      },
      take: 1,
    });
  }

  async updateQueueCounterId(queueId: number, payload: CounterIdUpdatePayload) {
    return this.prismaService.queue.update({
      where: {
        id_antrian: Number(queueId),
      },
      data: payload,
      select: {
        id_antrian: true,
        no_antrian: true,
        kode_antrian: true,
        loket: {
          select: {
            id_ms_loket_antrian: true,
            jenis_loket: true,
            nama_loket: true,
          },
        },
      },
    });
  }

  async findSkippedQueue(queueCode: string) {
    return this.prismaService.queue.findMany({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        status: { not: 2 },
        OR: [{ status_panggil: 2 }, { status_panggil: 3 }],
        is_deleted: false,
        kode_antrian: queueCode,
      },
      select: counterQueue,
    });
  }

  async queueAttendance(queueId: number, payload: QueueAttendancePayloadInput) {
    return this.prismaService.queue.update({
      where: {
        id_antrian: Number(queueId),
      },
      data: payload,
    });
  }

  async statusUpdate(queueId: number, payload: StatusPayloadInput) {
    return this.prismaService.queue.update({
      where: {
        id_antrian: Number(queueId),
      },
      data: payload,
    });
  }

  async createNewPatientOnsiteQueue(queue: PatientQueue) {
    try {
      return await this.prismaService.queue.create({
        data: queue,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findFirstTodayQueue(queue: RegisterQueuePayload) {
    const whereClause: Prisma.QueueWhereInput = {
      created_at: {
        gte: generateCurrentDateWithCustomHour('00:00:00'),
        lte: generateCurrentDateWithCustomHour('23:59:59'),
      },
      is_deleted: false,
      status: { not: 2 },
    };

    if (Number(queue.jenis_pasien) === 2) {
      whereClause.AND = [
        { no_hp: queue.no_hp },
        { tgl_lahir: queue.tgl_lahir },
      ];
    }

    if (Number(queue.jenis_pasien) === 1) {
      whereClause.OR = [
        { kode_rm: queue?.kode_rm || undefined },
        { no_bpjs: queue?.no_bpjs || undefined },
      ];
    }

    return this.prismaService.queue.findFirst({
      where: whereClause,
    });
  }

  async findTotalExistingQueue(queueNumber: number, queueCode: string) {
    return this.prismaService.queue.count({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        status: { not: 2 },
        kode_antrian: queueCode,
        status_panggil: { not: 1 },
        no_antrian: { lt: Number(queueNumber) },
      },
    });
  }

  async findTotalAndRemainingOnsiteQueue(queueCode: string) {
    try {
      const currentDate = generateDateString();

      const result = await this.prismaService.$queryRaw<DailyQueueSummary>(
        Prisma.sql`
          SELECT
              COALESCE(COUNT(antrian.kode_antrian), 0) AS jumlah_antrian_onsite,
              COALESCE(COUNT(antrian.kode_antrian), 0) -
              COALESCE(COUNT(CASE WHEN antrian.status_panggil = 1 THEN 1 END), 0) AS sisa_antrian_onsite
          FROM db_antrian AS antrian
          WHERE
            antrian.created_at LIKE CONCAT(${Prisma.sql`${currentDate}`}, '%')
            AND antrian.kode_antrian = ${queueCode.toString()}
            AND antrian.status != 2
            AND is_deleted = 0;
        `,
      );
      return JSON.parse(JSON.stringify(result[0], bigIntReplacer));
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
