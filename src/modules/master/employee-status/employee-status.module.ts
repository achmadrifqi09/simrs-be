import { Module } from '@nestjs/common';
import { EmployeeStatusService } from './service/employee-status.service';
import { EmployeeStatusController } from './controller/employee-status.controller';

@Module({
  controllers: [EmployeeStatusController],
  providers: [EmployeeStatusService],
})
export class EmployeeStatusModule {}
