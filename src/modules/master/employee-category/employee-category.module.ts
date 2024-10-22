import { Module } from '@nestjs/common';
import { TypeOfStatusOfficerService } from './service/employee-category.service';
import { TypeOfStatusOfficerController } from './controller/employee-category.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TypeOfStatusOfficerRepository } from './repository/employee-category.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [TypeOfStatusOfficerController],
  providers: [TypeOfStatusOfficerService, TypeOfStatusOfficerRepository],
})
export class TypeOfStatusOfficerModule {}
