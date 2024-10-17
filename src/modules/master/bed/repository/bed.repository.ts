import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { BedPayloadDTO } from '../dto/bed.dto';
import {
  BedAvailabilityDTO,
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class BedRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllBed(keyword?: string, status?: number) {
    const whereClause: Prisma.BedWhereInput = {
      is_deleted: false,
      OR: [
        { nama_bed: { contains: keyword } },
        { kamar: { nama_kamar: { contains: keyword } } },
      ],
    };

    if (status) {
      whereClause.status = Number(status);
    }

    return this.prismaService.bed.findMany({
      where: whereClause,
      include: {
        kamar: {
          select: {
            id: true,
            nama_kamar: true,
          },
        },
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

  async updateStatusBed(id: number, roomType: StatusUpdateDTO) {
    try {
      return await this.prismaService.bed.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: roomType,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateBedAvailability(id: number, bed: BedAvailabilityDTO) {
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

  async softDeleteBed(id: number, payload: SoftDeleteDTO) {
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
