import { prismaClient } from '../prisma';

export const insuranceSeeder = async () => {
  try {
    console.log('Seeding insurance ...');
    prismaClient.insurance.create({
      data: {
        id: 1,
        nama_asuransi: 'BPJS Kesehatan',
        status: 1,
      },
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};
