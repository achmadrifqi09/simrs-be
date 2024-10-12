import { userSeeder } from './module-seeder/user.seeder';
import { prismaClient } from './prisma';
import { menuSeeder } from './module-seeder/menu.seeder';
// import { permissionSeeder } from './module-seeder/permission.seeder';
// import { Menu, MenuPermission } from './types/menu';
// import { userPermissionSeeder } from './module-seeder/user-permission.seeder';
import { clientSeeder } from './module-seeder/client.seeder';
import { regionSeeder } from './module-seeder/region.seeder';

async function main() {
  await userSeeder();
  // const menus: Menu[] = await menuSeeder();
  // const permissions: MenuPermission[] = await permissionSeeder(menus);
  // await userPermissionSeeder(user, permissions);
  await menuSeeder();
  await clientSeeder();
  await regionSeeder();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
