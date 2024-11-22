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

export const queueAttendance: Prisma.QueueSelect = {
  id_antrian: true,
  jenis_pasien: true,
  jenis_penjamin: true,
  kode_rm: true,
  nama_pasien: true,
  tgl_lahir: true,
  no_hp: true,
  no_bpjs: true,
  no_rujukan: true,
  kode_antrian: true,
  no_antrian: true,
  jadwal_dokter: {
    select: {
      kode_instalasi_bpjs: true,
    },
  },
  id_jadwal_dokter: true,
  id_ms_loket_antrian: true,
  status_panggil: true,
  tgl_panggil: true,
  status: true,
};
