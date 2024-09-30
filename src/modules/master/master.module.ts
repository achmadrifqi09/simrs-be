import { Module } from '@nestjs/common';
import { ReligionModule } from './religion/religion.module';

@Module({
  imports: [ReligionModule],
})
export class MasterModule {}
