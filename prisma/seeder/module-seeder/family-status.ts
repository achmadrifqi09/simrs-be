import { prismaClient } from '../prisma';

export const familyStatusSeeder = async () => {
  try {
    console.log('Seeding insurance ...');
    await prismaClient.insurance.createMany({
      data: [
        {
          id: 1,
          nama_asuransi: 'Diri Sendiri',
          status: 1,
        },
        {
          id: 2,
          nama_asuransi: 'Bapak',
          status: 1,
        },
        {
          id: 3,
          nama_asuransi: 'Ibu',
          status: 1,
        },
        {
          id: 4,
          nama_asuransi: 'Kerabat',
          status: 1,
        },
      ],
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};
