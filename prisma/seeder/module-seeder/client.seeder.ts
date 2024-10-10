import { prismaClient } from '../prisma';

export const clientSeeder = async () => {
  console.log('Seeding client...');
  await prismaClient.appClient.create({
    data: {
      nama_client: 'SIMRS-V4',
    },
  });
};
