import { PrismaService } from '../../../prisma/prisma.service';
import { Dependencies } from '@nestjs/common';

@Dependencies([PrismaService])
export class WorkUnitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPolyclinic(keyword?: string) {
    return this.prismaService.workUnit.findMany({
      where: {
        OR: [{ jenis_pelayanan: 1 }, { jenis_pelayanan: 2 }],
        AND: {
          status_antrian: 1,
        },
        nama_unit_kerja: {
          contains: keyword,
        },
      },
      select: {
        id_unit_kerja: true,
        sub_id_unit: true,
        nama_unit_kerja: true,
        jenis_pelayanan: true,
        kode_instalasi_bpjs: true,
        status_antrian: true,
        id_unit_induk: true,
        status: true,
      },
    });
  }

  async getAll() {
    return this.prismaService.workUnit.findMany({
      take: 20,
      skip: 1,
    });
  }
}
