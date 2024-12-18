import { userSeeder } from './module-seeder/user.seeder';
import { prismaClient } from './prisma';
import { menuSeeder } from './module-seeder/menu.seeder';
import { clientSeeder } from './module-seeder/client.seeder';
import { regionSeeder } from './module-seeder/region.seeder';
import { accessSeeder } from './module-seeder/access.seeder';
import { userAccessSeeder } from './module-seeder/user-access';
import { insuranceSeeder } from './module-seeder/insurance.seeder';
import { employeeTypeStatusSeeder } from './module-seeder/employee-type-status.seeder';
import { familyStatusSeeder } from './module-seeder/family-status';

async function main() {
  await userSeeder();
  await menuSeeder();
  await insuranceSeeder();
  await familyStatusSeeder();
  await employeeTypeStatusSeeder();
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
