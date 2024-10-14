import { prismaClient } from '../prisma';
import { readJsonFile } from '../utils/importer';
import { batchCreate } from '../utils/creator';
import { UserAccess } from '../types/access';

export const userAccessSeeder = async () => {
  console.log('seeding user access ...');
  const levelAccess = readJsonFile<UserAccess[]>('/menu/user-access.json');
  await batchCreate(prismaClient.userAccess, levelAccess);
};
