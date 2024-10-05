import { User } from '@prisma/client';
import { MenuPermission } from '../types/menu';
import { prismaClient } from '../prisma';

export const userPermissionSeeder = async (
  user: User,
  menuPermissions: MenuPermission[],
) => {
  menuPermissions.map(async (permission: MenuPermission) => {
    await prismaClient.userPermission.create({
      data: {
        id_izin_menu: permission.id,
        id_user: user.id_user,
      },
    });
  });
};
