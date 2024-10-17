import { Module } from '@nestjs/common';
import { CountryService } from './service/country.service';
import { CountryController } from './controller/country.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CountryRepository } from './repository/country.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
})
export class CountryModule {}
