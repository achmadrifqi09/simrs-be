import { Module } from '@nestjs/common';
import { RoomClassService } from './service/room-class.service';
import { RoomClassController } from './controller/room-class.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RoomClassRepository } from './repository/room-class.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RoomClassController],
  providers: [RoomClassService, RoomClassRepository],
})
export class RoomClassModule {}
