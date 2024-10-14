import { prismaClient } from '../prisma';
import { Country, District, Province, Regency, Village } from '../types/region';
import { readJsonFile } from '../utils/importer';
import { batchCreate } from '../utils/creator';

const regionSeeder = async () => {
  try {
    console.log('Seeding country...');
    const country = readJsonFile<Country[]>('/region/ms_negara.json');
    await batchCreate(prismaClient.country, country);

    console.log('Seeding provinces...');
    const provinces = readJsonFile<Province[]>('/region/ms_provinsi.json');
    await batchCreate(prismaClient.province, provinces);

    console.log('Seeding regencies...');
    const regencies = readJsonFile<Regency[]>('/region/ms_kabkot.json');
    await batchCreate(prismaClient.regency, regencies);

    console.log('Seeding districts...');
    const districts = readJsonFile<District[]>('/region/ms_kecamatan.json');
    await batchCreate(prismaClient.district, districts);

    console.log('Seeding villages...');
    const villages = readJsonFile<Village[]>('/region/ms_desa.json');
    await batchCreate(prismaClient.village, villages);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};

export { regionSeeder };
