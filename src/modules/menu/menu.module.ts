import { Module } from '@nestjs/common';
import { MenuService } from './service/menu.service';
import { MenuController } from './controller/menu.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { MenuRepository } from './repository/menu.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
})
export class MenuModule {}
