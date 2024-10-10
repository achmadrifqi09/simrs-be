import { prismaClient } from '../prisma';
import fs from 'fs';
import path from 'path';
import { Province, Regency, District, Village, Country } from '../types/region';

const readJsonFile = <T>(filename: string): T[] => {
  const result = fs.readFileSync(
    path.resolve(__dirname, `../data/region/${filename}`),
    'utf8',
  );
  return JSON.parse(result);
};

const batchCreate = async <T>(
  model: any,
  data: T[],
  batchSize: number = 1000,
) => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await model.createMany({
      data: batch,
      skipDuplicates: true,
    });
  }
};

const regionSeeder = async () => {
  try {
    console.log('Seeding country...');
    const country = readJsonFile<Country>('ms_negara.json');
    await batchCreate(prismaClient.country, country);

    console.log('Seeding provinces...');
    const provinces = readJsonFile<Province>('ms_provinsi.json');
    await batchCreate(prismaClient.province, provinces);

    console.log('Seeding regencies...');
    const regencies = readJsonFile<Regency>('ms_kabkot.json');
    await batchCreate(prismaClient.regency, regencies);

    console.log('Seeding districts...');
    const districts = readJsonFile<District>('ms_kecamatan.json');
    await batchCreate(prismaClient.district, districts);

    console.log('Seeding villages...');
    const villages = readJsonFile<Village>('ms_desa.json');
    await batchCreate(prismaClient.village, villages);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};

export { regionSeeder };
