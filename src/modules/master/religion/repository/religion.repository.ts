import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReligionPayloadDTO } from '../dto/religio.dto';

@Dependencies([PrismaService])
@Injectable()
export class ReligionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllReligion(keyword?: string) {
    return this.prismaService.religion.findMany({
      where: {
        nama_agama: {
          contains: keyword,
        },
      },
    });
  }

  async createReligion(religion: ReligionPayloadDTO) {
    return this.prismaService.religion.create({
      data: {
        nama_agama: religion.nama_agama,
        status: religion.status,
        created_by: religion.created_by.toString(),
      },
    });
  }
}
