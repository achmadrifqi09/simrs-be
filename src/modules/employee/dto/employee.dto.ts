import { z } from 'zod';

export const CreateEmployeeDto = z.object({
  no_reg: z.string().max(50, 'Nomor registrasi maksimal 50 karakter'),
  nip_pegawai: z
    .string()
    .max(50, 'NIP pegawai maksimal 50 karakter')
    .optional(),
  nip_pns: z.string().max(50, 'NIP PNS maksimal 50 karakter').optional(),
  gelar_depan: z
    .string()
    .max(100, 'Gelar depan maksimal 100 karakter')
    .optional(),
  gelar_belakang: z
    .string()
    .max(100, 'Gelar belakang maksimal 100 karakter')
    .optional(),
  nama_pegawai: z.string().max(100, 'Nama pegawai maksimal 100 karakter'),
  id_ms_negara_asal: z.number().optional(),
  id_ms_provinsi_asal: z.number().optional(),
  id_ms_kota_asal: z.number().optional(),
  id_ms_kecamatan_asal: z.number().optional(),
  id_ms_desa_asal: z.number().optional(),
  alamat_asal: z.string().optional(),
  kode_pos_asal: z
    .string()
    .max(10, 'Kode pos asal maksimal 10 karakter')
    .optional(),
  rt_asal: z.string().max(5, 'RT asal maksimal 5 karakter').optional(),
  rw_asal: z.string().max(5, 'RW asal maksimal 5 karakter').optional(),
  id_ms_negara_tinggal: z.number(),
  id_ms_provinsi_tinggal: z.number(),
  id_ms_kota_tinggal: z.number(),
  id_ms_kecamatan_tinggal: z.number(),
  id_ms_desa_tinggal: z.number(),
  alamat_tinggal: z.string(),
  kode_pos_tinggal: z.string().max(10, 'Kode pos tinggal maksimal 10 karakter'),
  rt_tinggal: z.string().max(3, 'RT tinggal maksimal 3 karakter'),
  rw_tinggal: z.string().max(3, 'RW tinggal maksimal 3 karakter'),
  tempat_lahir: z.string().max(100, 'Tempat lahir maksimal 100 karakter'),
  tgl_lahir: z.date(),
  id_jenis_kelamin: z.number(),
  id_ms_golongan_darah: z.number().optional(),
  id_ms_status_kawin: z.number(),
  id_ms_agama: z.number(),
  id_ms_pendidikan: z.number(),
  id_ms_jenis_pegawai: z.number(),
  id_ms_status_pegawai: z.number(),
  id_ms_spesialis: z.number().optional(),
  id_unit_induk: z.number(),
  id_pangkat: z.number(),
  id_jabatan: z.number(),
  id_unit_jabatan: z.number(),
  id_gaji: z.number().optional(),
  pjs: z.number().optional(),
  hp: z.string().max(15, 'Nomor HP maksimal 15 karakter'),
  email: z
    .string()
    .email('Format email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),
  no_npwp: z.string().max(25, 'Nomor NPWP maksimal 25 karakter'),
  no_ktp: z.string().max(25, 'Nomor KTP maksimal 25 karakter'),
  no_ktam: z.string().max(25, 'Nomor KTAM maksimal 25 karakter'),
  foto: z.string().optional(),
  kode_arsip: z.string().max(20, 'Kode arsip maksimal 20 karakter').optional(),
  id_finger: z.string().max(10, 'ID finger maksimal 10 karakter'),
  kode_dpjp: z.string().max(20, 'Kode DPJP maksimal 20 karakter').optional(),
  tgl_masuk: z.date(),
  tgl_keluar: z.date().optional(),
  status_pns: z.number(),
  status_aktif: z.number(),
  id_pelamar: z.number().optional(),
  file_ktp: z.string().optional(),
  file_kk: z.string().optional(),
  file_ktam: z.string().optional(),
  file_npwp: z.string().optional(),
});

export const UpdateEmployeeDto = CreateEmployeeDto.partial();
