import { Module } from '@nestjs/common';
import { RankOfEmployeesService } from './service/employee-rank.service';
import { RankOfEmployeesController } from './controller/employee-rank.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RankOfEmployeesRepository } from './repository/employee-rank.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RankOfEmployeesController],
  providers: [RankOfEmployeesService, RankOfEmployeesRepository],
})
export class RankOfEmployeesModule {}
