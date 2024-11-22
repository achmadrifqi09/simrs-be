import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegistrationDto } from '../dto/registration.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { generateCurrentDateWithCustomHour } from '../../../utils/date-formatter';

@Dependencies([PrismaService])
@Injectable()
export class RegistrationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTodayRegistration(
    cursor: number,
    take: number,
    keyword?: string,
    idUnit?: number,
  ) {
    const whereClause: Prisma.RegistrationWhereInput = {
      is_deleted: false,
      created_at: {
        gte: generateCurrentDateWithCustomHour('00:00:00'),
        lte: generateCurrentDateWithCustomHour('23:59:59'),
      },
    };
    if (keyword) {
      whereClause.OR = [
        { kode_rm: keyword },
        { antrian: { nama_pasien: { contains: keyword } } },
      ];
    }

    if (idUnit) {
      whereClause.antrian = {
        jadwal_dokter: {
          unit: {
            id: Number(idUnit),
          },
        },
      };
    }

    const results = await this.prismaService.registration.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      select: {
        id: true,
        kode_rm: true,
        status_bpjs: true,
        antrian: {
          select: {
            nama_pasien: true,
            jenis_pasien: true,
            jadwal_dokter: {
              select: {
                unit: {
                  select: {
                    nama_unit_kerja: true,
                  },
                },
                pegawai: {
                  select: {
                    nama_pegawai: true,
                    gelar_depan: true,
                    gelar_belakang: true,
                  },
                },
                jam_buka_praktek: true,
                jam_tutup_praktek: true,
              },
            },
          },
        },
      },
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
}
