import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { CounterPayloadDTO } from '../dto/counter.dto';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class CounterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCounterById(id: number) {
    return this.prismaService.counter.findFirst({
      where: {
        id_ms_loket_antrian: Number(id),
        is_deleted: false,
      },
      select: {
        id_ms_loket_antrian: true,
        nama_loket: true,
        jenis_loket: true,
      },
    });
  }

  async findActiveCounterByType(type: number) {
    return this.prismaService.counter.findMany({
      where: {
        jenis_loket: Number(type),
        status: 1,
        is_deleted: false,
      },
      select: {
        id_ms_loket_antrian: true,
        nama_loket: true,
        jenis_loket: true,
      },
    });
  }

  async findCounter(keyword?: string, counterType?: number) {
    const whereClause: Prisma.CounterWhereInput = {
      OR: [{ nama_loket: { contains: keyword } }],
      is_deleted: false,
    };

    if (counterType && counterType !== 0) {
      whereClause.jenis_loket = Number(counterType);
    }

    if (Number(keyword)) {
      whereClause.OR.push({ jenis_loket: Number(keyword) });
    }

    return this.prismaService.counter.findMany({
      where: whereClause,
      orderBy: {
        jenis_loket: 'asc',
      },
    });
  }

  async createCounter(counter: CounterPayloadDTO) {
    try {
      return await this.prismaService.counter.create({
        data: counter,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateCounter(id: number, counter: CounterPayloadDTO) {
    try {
      return await this.prismaService.counter.update({
        where: {
          id_ms_loket_antrian: Number(id),
          is_deleted: false,
        },
        data: counter,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateStatusCounter(id: number, counter: UpdateStatus) {
    try {
      return await this.prismaService.counter.update({
        where: {
          id_ms_loket_antrian: Number(id),
          is_deleted: false,
        },
        data: counter,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteCounter(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.counter.update({
        where: {
          id_ms_loket_antrian: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
