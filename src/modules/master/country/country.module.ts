import { Module } from '@nestjs/common';
import { CountryService } from './service/country.service';
import { CountryController } from './controller/country.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CountryRepository } from './repository/country.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
})
export class CountryModule {}
