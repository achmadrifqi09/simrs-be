import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class UserAccessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findLevelUserByUserId(userId: number) {
    return this.prismaService.userAccess.findMany({
      where: {
        id_user: Number(userId),
      },
      select: {
        level_akses: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findManyUserAccessByUserId(userId: number) {
    return this.prismaService.userAccess.findMany({
      where: {
        id_user: userId,
      },
      select: {
        level_akses: {
          select: {
            izin_level_akses: {
              select: {
                id: true,
                id_level_akses: true,
                can_view: true,
                can_delete: true,
                can_create: true,
                can_update: true,
                menu: {
                  select: {
                    pathname: true,
                    tag: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findUserAccessPerTag(menuTag: string, levelAccessIds: number[]) {
    return this.prismaService.accessLevelPermission.findFirst({
      where: {
        id_level_akses: {
          in: levelAccessIds,
        },
        menu: {
          tag: menuTag,
        },
        is_deleted: false,
      },
      select: {
        id: true,
        id_level_akses: true,
        id_menu: true,
        can_view: true,
        can_create: true,
        can_update: true,
        can_delete: true,
      },
    });
  }
}
