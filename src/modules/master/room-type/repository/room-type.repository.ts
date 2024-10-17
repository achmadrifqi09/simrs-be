import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RoomTypePayloadDTO } from '../dto/room-type.dto';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';

@Dependencies([PrismaService])
@Injectable()
export class RoomTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoomType(keyword?: string, status?: number) {
    const whereClause: Prisma.RoomTypeWhereInput = {
      is_deleted: false,
      OR: [
        { nama_jenis_kamar: { contains: keyword } },
        { kelas_kamar: { nama_kelas_kamar: { contains: keyword } } },
      ],
    };

    if (status) {
      whereClause.status = Number(status);
    }

    return this.prismaService.roomType.findMany({
      where: whereClause,
      include: {
        kelas_kamar: {
          select: {
            nama_kelas_kamar: true,
            id: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createRoomType(roomType: RoomTypePayloadDTO) {
    try {
      return await this.prismaService.roomType.create({
        data: roomType,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateRoomType(id: number, roomType: RoomTypePayloadDTO) {
    try {
      return await this.prismaService.roomType.update({
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

  async updateStatusRoomType(id: number, roomType: StatusUpdateDTO) {
    try {
      return await this.prismaService.roomType.update({
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

  async softDeleteRoomType(id: number, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.roomType.update({
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
