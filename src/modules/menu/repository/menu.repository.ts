import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class MenuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.userPermission.findMany({
      where: {
        id_user: 1,
        is_deleted: false,
      },
      select: {
        izin_menu: {
          select: {
            menu: {
              select: {
                id: true,
                label: true,
                order: true,
                icon: true,
                pathname: true,
                is_submenu: true,
                submenu: {
                  where: {
                    is_deleted: false,
                    izin_submenu: {
                      some: {
                        izin_menu: {
                          izin_user: {
                            some: {
                              id_user: 1,
                              is_deleted: false,
                            },
                          },
                        },
                      },
                    },
                  },
                  select: {
                    id: true,
                    label: true,
                    pathname: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
