import { Menu, MenuPermission } from '../types/menu';
import { prismaClient } from '../prisma';

export const permissionSeeder = async (
  resultMenuSeeder: Menu[],
): Promise<MenuPermission[]> => {
  return Promise.all(
    resultMenuSeeder.map(async (menu: Menu) => {
      const permissionName: string = `${menu.label} full access`;
      const result = await prismaClient.menuPermission.create({
        data: {
          nama: permissionName,
          id_menu: menu.id,
          is_create: true,
          is_view: true,
          is_delete: true,
          is_update: true,
        },
      });

      if (menu.is_submenu) {
        menu.submenus.map(async (submenu) => {
          result['submenu'] = await prismaClient.submenuPermission.create({
            data: {
              id_izin_menu: result.id,
              id_submenu: submenu.id,
              is_create: true,
              is_view: true,
              is_delete: true,
              is_update: true,
            },
          });
        });
      }
      return result;
    }),
  );
};
