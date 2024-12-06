import { prismaClient } from '../prisma';

export const employeeTypeStatusSeeder = async () => {
  try {
    console.log('Seeding employee type status ...');
    await prismaClient.typeOfStatusOfficer.createMany({
      data: [
        {
          id_ms_jenis_pegawai_status: 1,
          status_jenis_pegawai: 'Dokter',
          kode_nip: '1',
          status: 1
        },
        {
          id_ms_jenis_pegawai_status: 2,
          status_jenis_pegawai: 'Perawat',
          kode_nip: '2',
          status: 1
        }
      ],
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};