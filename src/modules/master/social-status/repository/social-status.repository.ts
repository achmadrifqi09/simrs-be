import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocialStatusPayloadDTO } from '../dto/social-status.dto';
import { PrismaErrorHandler } from 'src/common/handler/prisma-error.handler';
import { SoftDelete, UpdateStatus } from 'src/common/types/common.type';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class SocialStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllSocialStatus(keyword?: string, status?: number) {
    const whereClause: Prisma.SocialStatusWhereInput = {
      OR: [{ nama_status_sosial: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword)) whereClause.OR.push({ id: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.socialStatus.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createSocialStatus(socialStatus: SocialStatusPayloadDTO) {
    try {
      return await this.prismaService.socialStatus.create({
        data: socialStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateSocialStatus(id: number, socialStatus: SocialStatusPayloadDTO) {
    try {
      return await this.prismaService.socialStatus.update({
        where: {
          id: Number(id),
          is_deleted: false,
        },
        data: socialStatus,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilitySocialStatus(id: number, payload: UpdateStatus) {
    try {
      return await this.prismaService.socialStatus.update({
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

  async softDeleteSocialStatus(id: number, payload: SoftDelete) {
    try {
      return await this.prismaService.socialStatus.update({
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
