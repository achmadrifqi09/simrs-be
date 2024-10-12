import { Menu, MenuPermission } from '../types/menu';
import { prismaClient } from '../prisma';

export const permissionSeeder = async (
  resultMenuSeeder: Menu[],
) => {
  console.log('Seeding permission...');
  // return Promise.all(
  //   resultMenuSeeder.map(async (menu: Menu) => {
  //     const permissionName: string = `${menu.label} full access`;
  //     const result = await prismaClient.menuPermission.create({
  //       data: {
  //         nama: permissionName,
  //         id_menu: menu.id,
  //         can_create: true,
  //         can_view: true,
  //         can_delete: true,
  //         can_update: true,
  //       },
  //     });
  //
  //     if (menu.is_submenu) {
  //       menu.submenus.map(async (submenu) => {
  //         result['submenu'] = await prismaClient.submenuPermission.create({
  //           data: {
  //             id_izin_menu: result.id,
  //             id_submenu: submenu.id,
  //             can_create: true,
  //             can_view: true,
  //             can_delete: true,
  //             can_update: true,
  //           },
  //         });
  //       });
  //     }
  //     return result;
  //   }),
  // );
};
