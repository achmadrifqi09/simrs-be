import { Module } from '@nestjs/common';
import { ReligionModule } from './religion/religion.module';
import { BloodTypeModule } from './blood-type/blood-type.module';
import { StructuralPositionModule } from './structural-position/structural-position.module';
import { MaritalStatusModule } from './marital-status/marital-status.module';
import { EmployeeStatusModule } from './employee-status/employee-status.module';
import { CountryModule } from './country/country.module';
import { ProvinceModule } from './province/province.module';
import { RegencyModule } from './regency/regency.module';

@Module({
  imports: [
    ReligionModule,
    BloodTypeModule,
    StructuralPositionModule,
    MaritalStatusModule,
    EmployeeStatusModule,
    CountryModule,
    ProvinceModule,
    RegencyModule,
  ],
})
export class MasterModule {}
