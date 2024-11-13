import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { generateDateString } from '../../../utils/date-generator';
import { DailyQueueSummary, NewPatient } from '../dto/queue.dto';
import { PrismaErrorHandler } from '../../../common/handler/prisma-error.handler';
import { bigIntReplacer } from '../../../utils/helper';

@Dependencies([PrismaService])
@Injectable()
export class QueueRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewPatientOnsiteQueue(queue: NewPatient) {
    try {
      return await this.prismaService.queue.create({
        data: queue,
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findTotalAndRemainingOnsiteQueue(queueCode: string) {
    try {
      const currentDate = generateDateString();

      const result = await this.prismaService.$queryRaw<DailyQueueSummary>(
        Prisma.sql`
          SELECT
              COALESCE(COUNT(antrian.kode_antrian), 0) AS jumlah_antrian_onsite,
              COALESCE(COUNT(antrian.kode_antrian), 0) -
              COALESCE(COUNT(CASE WHEN antrian.status_panggil = 1 THEN 1 END), 0) AS sisa_antrian_onsite
          FROM db_antrian AS antrian
          WHERE
            antrian.created_at LIKE CONCAT(${Prisma.sql`${currentDate}`}, '%')
            AND antrian.kode_antrian = ${queueCode.toString()}
            AND antrian.status != 2;
        `,
      );
      return JSON.parse(JSON.stringify(result[0], bigIntReplacer));
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
}
