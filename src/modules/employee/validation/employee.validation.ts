import z from 'zod';

const employeeValidation = z.object({
  no_reg: z
    .string({ message: 'Nomor registrasi harus diisi' })
    .min(1, { message: 'Nomor registrasi minimal 1 karakter' })
    .max(50, { message: 'Nomor registrasi maksimal 50 karakter' }),
  nip_pegawai: z
    .string({ message: 'NIP pegawai harus diisi' })
    .max(50, { message: 'NIP pegawai maksimal 50 karakter' })
    .nullish(),
  nip_pns: z
    .string()
    .max(50, { message: 'NIP PNS maksimal 50 karakter' })
    .nullish(),
  gelar_depan: z
    .string()
    .max(100, { message: 'Gelar depan maksimal 100 karakter' })
    .nullish(),
  gelar_belakang: z
    .string()
    .max(100, { message: 'Gelar belakang maksimal 100 karakter' })
    .nullish(),
  nama_pegawai: z
    .string({ message: 'Nama pegawai harus diisi' })
    .min(1, { message: 'Nama pegawai minimal 1 karakter' })
    .max(100, { message: 'Nama pegawai maksimal 100 karakter' }),
  id_ms_negara_asal: z.number().int().optional(),
  id_ms_provinsi_asal: z.number().int().optional(),
  id_ms_kota_asal: z.number().int().optional(),
  id_ms_kecamatan_asal: z.number().int().optional(),
  id_ms_desa_asal: z.number().int().optional(),
  alamat_asal: z.string().nullish(),
  kode_pos_asal: z
    .string()
    .max(10, { message: 'Kode pos asal maksimal 10 karakter' })
    .nullish(),
  rt_asal: z
    .string()
    .max(5, { message: 'RT asal maksimal 5 karakter' })
    .nullish(),
  rw_asal: z
    .string()
    .max(5, { message: 'RW asal maksimal 5 karakter' })
    .nullish(),
  id_ms_negara_tinggal: z
    .number()
    .int({ message: 'ID Negara tinggal harus diisi' }),
  id_ms_provinsi_tinggal: z
    .number()
    .int({ message: 'ID Provinsi tinggal harus diisi' }),
  id_ms_kota_tinggal: z
    .number()
    .int({ message: 'ID Kota tinggal harus diisi' }),
  id_ms_kecamatan_tinggal: z
    .number()
    .int({ message: 'ID Kecamatan tinggal harus diisi' }),
  id_ms_desa_tinggal: z
    .number()
    .int({ message: 'ID Desa tinggal harus diisi' }),
  alamat_tinggal: z
    .string({ message: 'Alamat tinggal harus diisi' })
    .min(1, { message: 'Alamat tinggal minimal 1 karakter' })
    .max(1000, { message: 'Alamat tinggal maksimal 1000 karakter' }),
  kode_pos_tinggal: z
    .string()
    .max(10, { message: 'Kode pos tinggal maksimal 10 karakter' }),
  rt_tinggal: z
    .string()
    .max(3, { message: 'RT tinggal maksimal 3 karakter' })
    .nullish(),
  rw_tinggal: z
    .string()
    .max(3, { message: 'RW tinggal maksimal 3 karakter' })
    .nullish(),
  tempat_lahir: z
    .string({ message: 'Tempat lahir harus diisi' })
    .max(100, { message: 'Tempat lahir maksimal 100 karakter' }),
  tgl_lahir: z.date({ message: 'Tanggal lahir harus diisi' }),
  id_jenis_kelamin: z.number().int({ message: 'ID Jenis kelamin harus diisi' }),
  id_ms_golongan_darah: z.number().int().optional(),
  id_ms_status_kawin: z
    .number()
    .int({ message: 'ID Status kawin harus diisi' }),
  id_ms_agama: z.number().int({ message: 'ID Agama harus diisi' }),
  id_ms_pendidikan: z.number().int({ message: 'ID Pendidikan harus diisi' }),
  id_ms_jenis_pegawai: z
    .number()
    .int({ message: 'ID Jenis pegawai harus diisi' }),
  id_ms_status_pegawai: z
    .number()
    .int({ message: 'ID Status pegawai harus diisi' }),
  id_ms_spesialis: z.number().int().optional(),
  id_unit_induk: z.number().int({ message: 'ID Unit induk harus diisi' }),
  id_pangkat: z.number().int({ message: 'ID Pangkat harus diisi' }),
  id_jabatan: z.number().int({ message: 'ID Jabatan harus diisi' }),
  id_unit_jabatan: z.number().int({ message: 'ID Unit jabatan harus diisi' }),
  id_gaji: z.number().int().optional(),
  pjs: z.number().int().optional(),
  hp: z
    .string({ message: 'Nomor HP harus diisi' })
    .max(15, { message: 'Nomor HP maksimal 15 karakter' }),
  email: z
    .string({ message: 'Email harus diisi' })
    .email({ message: 'Format email tidak valid' })
    .max(100, { message: 'Email maksimal 100 karakter' }),
  no_npwp: z
    .string()
    .max(25, { message: 'Nomor NPWP maksimal 25 karakter' })
    .nullish(),
  no_ktp: z
    .string()
    .max(25, { message: 'Nomor KTP maksimal 25 karakter' })
    .nullish(),
  foto: z.string().nullish(),
  kode_arsip: z
    .string()
    .max(20, { message: 'Kode arsip maksimal 20 karakter' })
    .nullish(),
  id_finger: z
    .string({ message: 'ID Finger harus diisi' })
    .max(10, { message: 'ID Finger maksimal 10 karakter' }),
  kode_dpjp: z
    .string()
    .max(20, { message: 'Kode DPJP maksimal 20 karakter' })
    .nullish(),
  tgl_masuk: z.date({ message: 'Tanggal masuk harus diisi' }),
  tgl_keluar: z.date().nullish(),
  status_pns: z.number().int({ message: 'Status PNS harus diisi' }),
  status_aktif: z.number().int({ message: 'Status aktif harus diisi' }),
  id_pelamar: z.number().int().optional(),
  created_at: z.date().optional(),
  created_by: z.number().int().default(0).optional(),
  modified_at: z.date().nullish(),
  modified_by: z.number().nullish(),
  deleted_at: z.date().nullish(),
  deleted_by: z.number().nullish(),
  restored_at: z.date().nullish(),
  restored_by: z.number().nullish(),
  is_deleted: z.boolean().default(false),
  is_restored: z.boolean().default(false),
});

export { employeeValidation };
