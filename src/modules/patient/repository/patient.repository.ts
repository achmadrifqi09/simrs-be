import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { LatestRM, PatientDTO } from '../dto/patient.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { SoftDelete } from '../../../common/types/common.type';
import { keysToDelete } from '../const/patient.const';

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

  async findPatientByBPJSNumber(bpjsNumber: string) {
    return this.prismaService.patient.findFirst({
      where: {
        no_bpjs: bpjsNumber,
        is_deleted: false,
      },
    });
  }

  async findFirstPatient(
    identifierNumber: number | string,
    identifierType?: number,
  ) {
    const whereClause: Prisma.PatientWhereInput = { is_deleted: false };
    identifierType = Number(identifierType);

    if (identifierType === 1) whereClause.kode_rm = identifierNumber.toString();
    if (identifierType === 2) whereClause.no_bpjs = identifierNumber.toString();
    if (identifierType === 3)
      whereClause.no_identitas = identifierNumber.toString();
    if (!identifierType) whereClause.id_pasien = Number(identifierNumber);

    return this.prismaService.patient.findFirst({
      where: whereClause,
    });
  }

  async findLastedRMCode(): Promise<LatestRM | null> {
    const result = await this.prismaService.patient.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        id_pasien: true,
        kode_rm: true,
      },
      orderBy: {
        kode_rm: 'desc',
      },
      take: 1,
    });
    return result.length > 0 ? result[0] : null;
  }

  async createNewPatient(patient: PatientDTO) {
    try {
      const payload = this.buildCreatePayload(patient);
      return this.prismaService.patient.create({
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  private buildCreatePayload(patient: PatientDTO) {
    const payload = {
      desa_asal: { connect: { id: String(patient.id_ms_desa_asal) } },
      desa_tinggal: { connect: { id: String(patient.id_ms_desa_tinggal) } },
      id_warga_negara: Number(patient.id_ms_negara_asal),
      kecamatan_tinggal: {
        connect: { id: String(patient.id_ms_kecamatan_tinggal) },
      },
      kota_asal: { connect: { id: String(patient.id_ms_kota_asal) } },
      kota_tinggal: { connect: { id: String(patient.id_ms_kota_tinggal) } },
      negara_asal: { connect: { id: Number(patient.id_ms_negara_asal) } },
      negara_tinggal: {
        connect: { id: Number(patient.id_ms_negara_tinggal) },
      },
      pendidikan: {
        connect: {
          id_ms_tingkat_pendidikan: Number(patient.id_ms_pendidikan),
        },
      },
      provinsi_asal: { connect: { id: String(patient.id_ms_provinsi_asal) } },
      provinsi_tinggal: {
        connect: { id: String(patient.id_ms_provinsi_tinggal) },
      },
      agama: { connect: { id_ms_agama: patient.id_ms_agama } },
      kecamatan_asal: {
        connect: { id: String(patient.id_ms_kecamatan_asal) },
      },
      golongan_darah: {
        connect: {
          id_ms_golongan_darah: Number(patient.id_ms_golongan_darah),
        },
      },
      status_kawin: {
        connect: { id_ms_status_kawin: Number(patient.id_ms_status_kawin) },
      },
    };
    keysToDelete.forEach((key: string) => {
      delete patient[key];
    });
    const finalPayload: Prisma.PatientCreateInput = {
      ...payload,
      ...patient,
    };
    return finalPayload;
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
