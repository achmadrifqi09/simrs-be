import { Module } from '@nestjs/common';
import { RoomTypeService } from './service/room-type.service';
import { RoomTypeController } from './controller/room-type.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RoomTypeRepository } from './repository/room-type.repository';
import { UserAccessModule } from '../../user-access/user-access.module';

@Module({
  imports: [PrismaModule, UserAccessModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService, RoomTypeRepository],
})
export class RoomTypeModule {}
