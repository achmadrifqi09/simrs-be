import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { BedPayloadDTO } from '../dto/bed.dto';
import {
  BedAvailability,
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class BedRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllBed(
    keyword?: string,
    status?: number,
    room_id?: number,
    bed_id?: number,
    cursor?: number,
    take?: number,
  ) {
    const whereClause: Prisma.BedWhereInput = {
      is_deleted: false,
      OR: [
        { nama_bed: { contains: keyword } },
        { kamar: { nama_kamar: { contains: keyword } } },
      ],
    };

    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    if (Number(room_id)) whereClause.id_ms_kamar = Number(room_id);

    if (status) {
      whereClause.status = Number(status);
    }

    if (bed_id) {
      whereClause.id = Number(bed_id);
    }

    return this.prismaService.bed.findMany({
      take: Number(take) || 10,
      skip: Number(cursor) || 0,
      where: whereClause,
      include: {
        kamar: {
          select: {
            id: true,
            nama_kamar: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createBed(bed: BedPayloadDTO) {
    try {
      return await this.prismaService.bed.create({
        data: bed,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateBed(id: number, bed: BedPayloadDTO) {
    try {
      return await this.prismaService.bed.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: bed,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusBed(id: number, bed: UpdateStatus) {
    try {
      return await this.prismaService.bed.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: bed,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateBedAvailability(id: number, bed: BedAvailability) {
    try {
      return await this.prismaService.bed.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: bed,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteBed(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.bed.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
