import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrationFee } from '../dto/registration-fee.dto';
import { PrismaErrorHandler } from 'src/common/handler/prisma-error.handler';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegistrationFeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRegistrationFee(registrationFee: RegistrationFee) {
    try {
      const registrationId = registrationFee.id_pendaftaran;
      delete registrationFee.id_pendaftaran;

      const payload: Prisma.RegistrationFeeCreateInput = {
        ...registrationFee,
        pendaftaran: {
          connect: {
            id: Number(registrationId),
          },
        },
      };
      return await this.prismaService.registrationFee.create({
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
  async updateRegistrationFee(id: number, registrationFee: RegistrationFee) {
    const registrationId = registrationFee.id_pendaftaran;
    delete registrationFee.id_pendaftaran;

    const payload: Prisma.RegistrationFeeUpdateInput = {
      ...registrationFee,
      pendaftaran: {
        connect: {
          id: Number(registrationId),
        },
      },
    };
    try {
      return await this.prismaService.registrationFee.update({
        where: { id: Number(id), is_deleted: false },
        data: payload,
      });
    } catch (error) {
      console.log(error);
      PrismaErrorHandler.handle(error);
    }
  }

  async findRegistrationFeeByRegistrationId(id: number) {
    return this.prismaService.registrationFee.findFirst({
      where: { id_pendaftaran: Number(id) },
    });
  }
}
