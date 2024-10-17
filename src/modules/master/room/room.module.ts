import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './controller/room.controller';
import { RoomRepository } from './repository/room.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
