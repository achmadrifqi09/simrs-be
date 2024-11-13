import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PatientDTO } from '../dto/patient.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { SoftDelete } from '../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class PatientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPatient(keyword: string, cursor: number, take: number) {
    const whereClause: Prisma.PatientWhereInput = {
      OR: [
        { nama_pasien: { contains: keyword } },
        { kode_rm: { contains: keyword } },
        { no_identitas: { contains: keyword } },
        { no_bpjs: { contains: keyword } },
      ],
      is_deleted: false,
    };

    const result = await this.prismaService.patient.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
    });

    return {
      results: result,
      pagination: {
        current_cursor: Number(cursor),
        take: Number(take) || 10,
      },
    };
  }

  async findFirstPatient(
    identifierNumber: number | string,
    identifierType?: number,
  ) {
    const whereClause: Prisma.PatientWhereInput = { is_deleted: false };
    identifierType = Number(identifierType);

    if (identifierType === 1) whereClause.kode_rm = identifierNumber.toString();
    if (identifierNumber === 2)
      whereClause.no_bpjs = identifierNumber.toString();
    if (identifierNumber === 3)
      whereClause.no_identitas = identifierNumber.toString();
    if (!identifierType) whereClause.id_pasien = Number(identifierNumber);

    return this.prismaService.patient.findFirst({
      where: whereClause,
    });
  }

  async updatePatient(id: number, patient: PatientDTO) {
    try {
      return await this.prismaService.patient.update({
        where: {
          id_pasien: Number(id),
        },
        data: patient,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeletePatient(id: number, payload: SoftDelete) {
    return this.prismaService.patient.update({
      where: {
        id_pasien: Number(id),
      },
      data: payload,
    });
  }
}
