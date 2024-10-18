import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationLevelPayloadDTO } from '../dto/education-level.dto';
import { PrismaErrorHandler } from 'src/common/handler/prisma-error.handler';
import { StatusUpdateDTO, SoftDeleteDTO } from 'src/common/dto/common.dto';
import { Prisma } from '@prisma/client';

@Dependencies([PrismaService])
@Injectable()
export class EducationLevelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllEducationLevel(keyword?: string, status?: number) {
    const whereClause: Prisma.EducationLevelWhereInput = {
      OR: [{ nama_tingkat_pendidikan: { contains: keyword } }],
      is_deleted: false,
    };
    if (Number(keyword))
      whereClause.OR.push({ id_ms_tingkat_pendidikan: Number(keyword) });
    if (status) {
      whereClause['AND'] = {
        status: Number(status),
      };
    }

    return this.prismaService.educationLevel.findMany({
      where: whereClause,
      orderBy: {
        id_ms_tingkat_pendidikan: 'desc',
      },
    });
  }

  async createEducationLevel(educationLevel: EducationLevelPayloadDTO) {
    try {
      return await this.prismaService.educationLevel.create({
        data: educationLevel,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateEducationLevel(
    id: number,
    educationLevel: EducationLevelPayloadDTO,
  ) {
    try {
      return await this.prismaService.educationLevel.update({
        where: {
          id_ms_tingkat_pendidikan: Number(id),
          is_deleted: false,
        },
        data: educationLevel,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateVisibilityEducationLevel(id: number, payload: StatusUpdateDTO) {
    try {
      return await this.prismaService.educationLevel.update({
        where: {
          id_ms_tingkat_pendidikan: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteEducationLevel(id: number, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.educationLevel.update({
        where: {
          id_ms_tingkat_pendidikan: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
