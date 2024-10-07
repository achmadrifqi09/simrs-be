import { Module } from '@nestjs/common';
import { EmployeeStatusService } from './service/employee-status.service';
import { EmployeeStatusController } from './controller/employee-status.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { EmployeeStatusRepository } from './repository/employee-status.repository.dto';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeStatusController],
  providers: [EmployeeStatusService, EmployeeStatusRepository],
})
export class EmployeeStatusModule {}
