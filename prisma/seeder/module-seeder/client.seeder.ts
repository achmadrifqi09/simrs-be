import { prismaClient } from '../prisma';

export const clientSeeder = async () => {
  await prismaClient.appClient.create({
    data: {
      nama_client: 'SIMRS-V4',
    },
  });
};
