import { Module } from '@nestjs/common';
import { StructuralPositionService } from './service/structural-position.service';
import { StructuralPositionController } from './controller/structural-position.controller';
import { StructuralPositionRepository } from './repository/structural-position.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StructuralPositionController],
  providers: [StructuralPositionService, StructuralPositionRepository],
})
export class StructuralPositionModule {}
