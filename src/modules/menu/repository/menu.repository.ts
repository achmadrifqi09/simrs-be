import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class MenuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMenuByLevelAccess(levelAccessIds: number[]) {
    return this.prismaService.accessLevelPermission.findMany({
      where: {
        id_level_akses: {
          in: levelAccessIds,
        },
        is_deleted: false,
      },
      select: {
        id_menu: true,
        menu: {
          select: {
            id: true,
            parent_id: true,
            order: true,
            label: true,
            icon: true,
            pathname: true,
            tag: true,
            is_submenu: true,
            status: true,
          },
        },
      },
      distinct: ['id_menu'],
    });
  }
}
