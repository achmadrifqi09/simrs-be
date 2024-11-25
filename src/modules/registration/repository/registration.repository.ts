import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegistrationDto } from '../dto/registration.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { generateCurrentDateWithCustomHour } from '../../../utils/date-formatter';
import {
  registrationSelect,
  registrationSelectForSingleResponse,
} from '../const/registration.const';
import { CancellationStatusPayload } from '../dto/registration.dto';

@Dependencies([PrismaService])
@Injectable()
export class RegistrationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTodayRegistration(
    cursor: number,
    take: number,
    keyword?: string,
    idUnit?: number,
    idDoctor?: number,
    patientType?: number,
    guarantorType?: number,
  ) {
    const whereClause: Prisma.RegistrationWhereInput = {
      is_deleted: false,
      created_at: {
        gte: generateCurrentDateWithCustomHour('00:00:00'),
        lte: generateCurrentDateWithCustomHour('23:59:59'),
      },
      antrian: {
        jenis_pasien: Number(patientType) || undefined,
        jadwal_dokter: {
          unit: {
            id: Number(idUnit) || undefined,
          },
          pegawai: { id_pegawai: Number(idDoctor) || undefined },
        },
        jenis_penjamin: Number(guarantorType) || undefined,
      },
    };
    if (keyword) {
      whereClause.OR = [
        { kode_rm: keyword },
        { antrian: { nama_pasien: { contains: keyword } } },
      ];
    }

    const results = await this.prismaService.registration.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      select: registrationSelect,
      orderBy: {
        id: 'desc',
      },
    });

    return {
      results: results,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
  }

  async findRegistrationById(id: number) {
    return this.prismaService.registration.findFirst({
      where: { id: Number(id), is_deleted: false },
      select: registrationSelectForSingleResponse,
    });
  }

  async createRegistration(
    queueId: number,
    insuranceId: number | null,
    registrationData: RegistrationDto,
  ) {
    try {
      const registration: Prisma.RegistrationCreateInput = {
        ...registrationData,
        antrian: {
          connect: {
            id_antrian: queueId,
          },
        },
      };
      if (insuranceId && Number(insuranceId)) {
        registration.asuransi = {
          connect: {
            id: Number(insuranceId),
          },
        };
      }
      return await this.prismaService.registration.create({
        data: registration,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateCancellationStatus(
    id: number,
    payload: CancellationStatusPayload,
  ) {
    return this.prismaService.registration.update({
      where: {
        id: Number(id),
        is_deleted: false,
      },
      data: payload,
    });
  }
}
