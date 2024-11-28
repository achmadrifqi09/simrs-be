import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { UserAccessModule } from '../user-access/user-access.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmployeeRepository } from './repository/employee.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    UserAccessModule,
    MulterModule.register({
      dest: './storage',
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
