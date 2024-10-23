import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { RoomClassPayloadDTO } from '../dto/room-class.dto';
import { SoftDelete, UpdateStatus } from '../../../../common/types/common.type';

@Dependencies([PrismaService])
@Injectable()
export class RoomClassRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoomClass(keyword?: string, status?: number) {
    const whereClause: Prisma.RoomClassWhereInput = {
      OR: [
        { kode_bpjs_kamar: { contains: keyword } },
        {
          nama_kelas_kamar: {
            contains: keyword,
          },
        },
      ],
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.roomClass.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createRoomClass(roomClass: RoomClassPayloadDTO) {
    try {
      return await this.prismaService.roomClass.create({
        data: roomClass,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateRoomClass(id: number, roomClass: RoomClassPayloadDTO) {
    try {
      return await this.prismaService.roomClass.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: roomClass,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusRoomClass(id: number, roomClass: UpdateStatus) {
    try {
      return await this.prismaService.roomClass.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: roomClass,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteRoomClass(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.roomClass.update({
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
