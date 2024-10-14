import { userSeeder } from './module-seeder/user.seeder';
import { prismaClient } from './prisma';
import { menuSeeder } from './module-seeder/menu.seeder';
import { clientSeeder } from './module-seeder/client.seeder';
import { regionSeeder } from './module-seeder/region.seeder';
import { accessSeeder } from './module-seeder/access.seeder';
import { userAccessSeeder } from './module-seeder/user-access';

async function main() {
  await userSeeder();
  await menuSeeder();
  await accessSeeder();
  await userAccessSeeder();

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
