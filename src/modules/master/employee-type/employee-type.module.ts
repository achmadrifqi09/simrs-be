import { Module } from '@nestjs/common';
import { TypeOfEmployeesService } from './service/employee-type.service';
import { TypeOfEmployeesController } from './controller/employee-type.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TypeOfEmployeesRepository } from './repository/employee-type.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [TypeOfEmployeesController],
  providers: [TypeOfEmployeesService, TypeOfEmployeesRepository],
})
export class TypeOfEmployeesModule {}
