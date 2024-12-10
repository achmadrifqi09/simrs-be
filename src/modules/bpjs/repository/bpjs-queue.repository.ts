import { generateCurrentDateWithCustomHour } from './../../../utils/date-formatter';
import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateDateString } from 'src/utils/date-generator';
import { DoctorQuotaFilled } from '../dto/queue/queue.dto';
import { bigIntReplacer } from 'src/utils/helper';

@Injectable()
export class BPJSQueueRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findQueue(queueId: number) {
    return this.prismaService.queue.findFirst({
      where: { id_antrian: Number(queueId), is_deleted: false },
      include: {
        jadwal_dokter: true,
      },
    });
  }

  async findRegistrationById(id: number) {
    return this.prismaService.registration.findFirst({
      where: { id: Number(id), is_deleted: false },
    });
  }

  async findDoctorQuotaFilled(
    doctorScheduleId: number,
    queueNumber: number,
  ): Promise<DoctorQuotaFilled> {
    const currentDate = generateDateString();
    const result = await this.prismaService.$queryRaw<DoctorQuotaFilled>(
      Prisma.sql`
        SELECT
          COUNT(CASE WHEN jenis_penjamin = 2 THEN 1 END) AS total_mjkn,
          COUNT(CASE WHEN jenis_penjamin = 1 THEN 1 END) AS total_non_mjkn
        FROM db_antrian
        WHERE 
          created_at LIKE CONCAT(${Prisma.sql`${currentDate}`}, '%')
          AND no_antrian < ${queueNumber}
          AND id_jadwal_dokter = ${doctorScheduleId}
          AND status != 2
          AND is_deleted = 0;
      `,
    );
    const stringResponse: DoctorQuotaFilled = JSON.parse(
      JSON.stringify(result[0], bigIntReplacer),
    );
    return {
      total_mjkn: Number(stringResponse.total_mjkn),
      total_non_mjkn: Number(stringResponse.total_non_mjkn),
    };
  }

  async findPaticipantByRMCode(rmCode: string) {
    return this.prismaService.patient.findFirst({
      where: {
        kode_rm: rmCode,
        is_deleted: false,
      },
    });
  }

  async updateStatusAndBookingCode(
    id: number,
    bookingCode: string,
    status: number = 1,
  ) {
    return this.prismaService.registration.update({
      where: { id: Number(id) },
      data: { status_kirim_bpjs: Number(status), kode_booking: bookingCode },
    });
  }
  async findTodayQueueByRMCode(rmCode: string) {
    return this.prismaService.queue.findFirst({
      where: {
        created_at: {
          gte: generateCurrentDateWithCustomHour('00:00:00'),
          lte: generateCurrentDateWithCustomHour('23:59:59'),
        },
        kode_rm: rmCode,
      },
      include: {
        pendaftaran: true,
        jadwal_dokter: true,
      },
    });
  }
}
