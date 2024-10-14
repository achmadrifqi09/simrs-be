import { prismaClient } from '../prisma';
import { readJsonFile } from '../utils/importer';
import { batchCreate } from '../utils/creator';
import { Menu } from '../types/menu';

export const menuSeeder = async () => {
  try {
    console.log('Seeding menu ...');
    const menus = readJsonFile<Menu[]>('/menu/menu.json');
    await batchCreate(prismaClient.menu, menus);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};
