import { Prisma } from '@prisma/client';

export const registrationSelect: Prisma.RegistrationSelect = {
  id: true,
  kode_rm: true,
  status_bpjs: true,
  tgl_daftar: true,
  antrian: {
    select: {
      nama_pasien: true,
      jenis_pasien: true,
      jenis_penjamin: true,
      jadwal_dokter: {
        select: {
          id_jadwal_dokter: true,
          jam_buka_praktek: true,
          jam_tutup_praktek: true,
          unit: {
            select: {
              nama_unit_kerja: true,
            },
          },
          pegawai: {
            select: {
              nama_pegawai: true,
              gelar_depan: true,
              gelar_belakang: true,
            },
          },
        },
      },
    },
  },
  asuransi: {
    select: {
      id: true,
      nama_asuransi: true,
    },
  },
};

export const registrationSelectForSingleResponse: Prisma.RegistrationSelect = {
  id: true,
  kode_rm: true,
  status_bpjs: true,
  tgl_daftar: true,
  no_rujukan: true,
  status_rujukan: true,
  nomor_asuransi: true,
  nomor_rujuk_balik: true,
  no_sep: true,
  cob: true,
  no_cob: true,
  nama_wali: true,
  hub_wali: true,
  telp_wali: true,
  antrian: {
    select: {
      nama_pasien: true,
      jenis_pasien: true,
      jadwal_dokter: {
        select: {
          id_jadwal_dokter: true,
          jam_buka_praktek: true,
          jam_tutup_praktek: true,
          unit: {
            select: {
              nama_unit_kerja: true,
            },
          },
          pegawai: {
            select: {
              nama_pegawai: true,
              gelar_depan: true,
              gelar_belakang: true,
              kode_dpjp: true,
            },
          },
        },
      },
    },
  },
};
