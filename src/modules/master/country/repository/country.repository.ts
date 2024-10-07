import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { PrismaErrorHandler } from '../../../../common/handler/prisma-error.handler';
import { CountryPayloadDTO } from '../dto/country.dto';

@Dependencies([PrismaService])
@Injectable()
export class CountryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCountry(keyword?: string) {
    return this.prismaService.country.findMany({
      where: {
        nama_negara: {
          contains: keyword,
        },
        is_deleted: false,
      },
    });
  }

  async updateStatusCountry(id: number, country: StatusUpdateDTO) {
    try {
      return await this.prismaService.country.update({
        where: {
          id_ms_negara: Number(id),
          is_deleted: false,
        },
        data: country,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async createCountry(country: CountryPayloadDTO) {
    try {
      return await this.prismaService.country.create({
        data: country,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async softDeleteCountry(id: number, payload: SoftDeleteDTO) {
    try {
      return await this.prismaService.country.update({
        where: {
          id_ms_negara: Number(id),
          is_deleted: false,
        },
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateCountry(id: number, country: CountryPayloadDTO) {
    try {
      return await this.prismaService.country.update({
        where: {
          id_ms_negara: Number(id),
          is_deleted: false,
        },
        data: country,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
