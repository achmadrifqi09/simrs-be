import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RoomPayloadDTO } from '../dto/room.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class RoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoom(keyword?: string, status?: number) {
    const whereClause: Prisma.RoomWhereInput = {
      is_deleted: false,
      OR: [
        { nama_kamar: { contains: keyword } },
        { jenis_kamar: { nama_jenis_kamar: { contains: keyword } } },
        { gedung: { nama_gedung: { contains: keyword } } },
      ],
    };

    if (status) {
      whereClause.status = Number(status);
    }

    return this.prismaService.room.findMany({
      where: whereClause,
      include: {
        jenis_kamar: {
          select: {
            id: true,
            nama_jenis_kamar: true,
          },
        },
        gedung: {
          select: {
            id: true,
            nama_gedung: true,
          },
        },
      },
    });
  }

  async createRoom(room: RoomPayloadDTO) {
    try {
      return await this.prismaService.room.create({
        data: room,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateRoom(id: number, room: RoomPayloadDTO) {
    try {
      return await this.prismaService.room.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: room,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusRoom(id: number, room: StatusUpdateDTO) {
    try {
      return await this.prismaService.room.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: room,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteRoom(id: number, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.room.update({
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
