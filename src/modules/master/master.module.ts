import { Module } from '@nestjs/common';
import { ReligionModule } from './religion/religion.module';
import { BloodTypeModule } from './blood-type/blood-type.module';
import { StructuralPositionModule } from './structural-position/structural-position.module';
import { MaritalStatusModule } from './marital-status/marital-status.module';
import { EmployeeStatusModule } from './employee-status/employee-status.module';
import { CountryModule } from './country/country.module';
import { ProvinceModule } from './province/province.module';
import { RegencyModule } from './regency/regency.module';
import { DistrictModule } from './district/district.module';
import { SpecialistModule } from './specialist/specialist.module';
import { VillageModule } from './village/village.module';
import { RankOfEmployeesModule } from './employee-rank/employee-rank.module';
import { FamilyStatusModule } from './family-status/family-status.module';
import { SocialStatusModule } from './social-status/social-status.module';
import { EducationLevelModule } from './education-level/education-level.module';
import { BuildingModule } from './building/building.module';
import { RoomClassModule } from './room-class/room-class.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { RoomModule } from './room/room.module';
import { BedModule } from './bed/bed.module';
import { CounterModule } from './counter/counter.module';

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
    DistrictModule,
    SpecialistModule,
    VillageModule,
    RankOfEmployeesModule,
    FamilyStatusModule,
    SocialStatusModule,
    EducationLevelModule,
    BuildingModule,
    RoomClassModule,
    RoomTypeModule,
    RoomModule,
    BedModule,
    CounterModule,
  ],
  exports: [CounterModule],
})
export class MasterModule {}
