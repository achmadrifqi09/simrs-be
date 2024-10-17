import { Module } from '@nestjs/common';
import { RankOfEmployeesService } from './service/employee-rank.service';
import { RankOfEmployeesController } from './controller/employee-rank.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RankOfEmployeesRepository } from './repository/employee-rank.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [RankOfEmployeesController],
  providers: [RankOfEmployeesService, RankOfEmployeesRepository],
})
export class RankOfEmployeesModule {}
