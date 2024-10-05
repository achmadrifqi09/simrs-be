import { userSeeder } from './module-seeder/user.seeder';
import { prismaClient } from './prisma';
import { menuSeeder } from './module-seeder/menu.seeder';
import { permissionSeeder } from './module-seeder/permission.seeder';
import { Menu, MenuPermission } from './types/menu';
import { userPermissionSeeder } from './module-seeder/user-permission.seeder';
import { clientSeeder } from './module-seeder/client.seeder';

async function main() {
  const user = await userSeeder();
  const menus: Menu[] = await menuSeeder();
  const permissions: MenuPermission[] = await permissionSeeder(menus);
  await clientSeeder();
  await userPermissionSeeder(user, permissions);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
