import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class MenuRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getMenuByUserId(userId: number) {
    return this.prismaService.menu.findMany({
      where: {
        is_deleted: false,
        menu_permission: {
          some: {
            id_user: userId,
            can_view: true,
            is_deleted: false,
          },
        },
      },
      select: {
        id: true,
        parent_id: true,
        order: true,
        label: true,
        icon: true,
        pathname: true,
        is_submenu: true,
        menu_permission: {
          where: {
            id_user: userId,
            is_deleted: false,
          },
          select: {
            can_create: true,
            can_update: true,
            can_delete: true,
          },
        },
      },
      orderBy: [{ parent_id: 'asc' }, { order: 'asc' }],
    });
  }
}
