import { Injectable } from '@nestjs/common';
import { RegistrationTaskIdDto } from '../dto/queue/task-id.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandler } from 'src/common/handler/prisma-error.handler';

@Injectable()
export class BPJSTaskIdRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRegistrationTaskId(payload: RegistrationTaskIdDto) {
    try {
      return this.prismaService.registrationTaskId.create({
        data: payload,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async updateTaskIdOnRegistration(registrationId: number, taskId: number) {
    try {
      return this.prismaService.registration.update({
        where: { id: Number(registrationId) },
        data: { task_id_terakhir: taskId },
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findInternalTaskId(bookingCode: string) {
    return this.prismaService.registrationTaskId.findMany({
      where: {
        kode_booking: bookingCode,
        is_deleted: false,
      },
    });
  }
}
