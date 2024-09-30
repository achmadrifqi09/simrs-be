import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReligionDTO } from '../dto/religio.dto';

@Dependencies([PrismaService])
@Injectable()
export class ReligionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createReligion(religion: ReligionDTO) {
    return this.prismaService.religion.create({
      data: {
        nama_agama: religion.nama_agama,
        status: religion.status ? 1 : 0,
        created_by: religion.created_by.toString(),
      },
    });
  }
}
