import { prismaClient } from '../prisma';
import { readJsonFile } from '../utils/importer';
import { batchCreate } from '../utils/creator';
import { Access, AccessPermission } from '../types/access';

export const accessSeeder = async () => {
  console.log('seeding access level ...');
  const levelAccess = readJsonFile<Access[]>('/menu/level-access.json');
  await batchCreate(prismaClient.accessLevel, levelAccess);

  console.log('Seeding access level permission ...');
  const levelAccessPermission = readJsonFile<AccessPermission[]>(
    '/menu/level-access-permission.json',
  );
  await batchCreate(prismaClient.accessLevelPermission, levelAccessPermission);
};
