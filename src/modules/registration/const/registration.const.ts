import { Prisma } from '@prisma/client';

export const registrationSelect: Prisma.RegistrationSelect = {
  id: true,
  kode_rm: true,
  nomor_registrasi: true,
  status_bpjs: true,
  tgl_daftar: true,
  status_batal: true,
  keterangan_batal: true,
  status_kirim_bpjs: true,
  antrian: {
    select: {
      id_antrian: true,
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
  id_asuransi: true,
  no_sep: true,
  cob: true,
  no_cob: true,
  nama_wali: true,
  hub_wali: true,
  telp_wali: true,
  nomor_antrian_poli: true,
  kode_antrian_poli: true,
  status_kirim_bpjs: true,
  kode_booking: true,
  task_id_terakhir: true,
  antrian: {
    select: {
      id_antrian: true,
      nama_pasien: true,
      jenis_pasien: true,
      jenis_penjamin: true,
      no_antrian: true,
      kode_antrian: true,
      jadwal_dokter: {
        select: {
          id_jadwal_dokter: true,
          jam_buka_praktek: true,
          jam_tutup_praktek: true,
          unit: {
            select: {
              nama_unit_kerja: true,
              kode_instalasi_bpjs: true,
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
  biaya_pendaftaran: {
    select: {
      id: true,
      id_pendaftaran: true,
      biaya_daftar: true,
      diskon_daftar: true,
      biaya_kartu: true,
      diskon_kartu: true,
      biaya_dokter: true,
      diskon_dokter: true,
      total_biaya: true,
      tgl_billing_daftar: true,
      tgl_billing_daftar_selesai: true,
      created_at: true,
    },
  },
  asuransi: {
    select: {
      id: true,
      nama_asuransi: true,
    },
  },
  modified_at: true,
};
