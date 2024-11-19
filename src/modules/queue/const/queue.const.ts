import { Prisma } from '@prisma/client';

export const counterQueue: Prisma.QueueSelect = {
  id_antrian: true,
  status_panggil: true,
  id_ms_loket_antrian: true,
  jadwal_dokter: {
    select: {
      id_jadwal_dokter: true,
      kode_instalasi_bpjs: true,
      jam_tutup_praktek: true,
      jam_buka_praktek: true,
      pegawai: {
        select: {
          gelar_depan: true,
          gelar_belakang: true,
          nama_pegawai: true,
        },
      },
    },
  },
  jenis_pasien: true,
  jenis_penjamin: true,
  nama_pasien: true,
  kode_antrian: true,
  no_antrian: true,
};
