import { z } from 'zod';

const dateValidation = z
  .string()
  .refine(
    (val) => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      return regex.test(val);
    },
    {
      message: 'Tanggal tidak valid, format harus dd-mm-yyyy',
    },
  )
  .transform((val) => {
    if (/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(val)) {
      const [day, month, year] = val.split('-');
      val = `${year}-${month}-${day}`;
    }
    return new Date(val);
  });

const ifStringOrNumber = z.union([z.string(), z.number()]).transform((val) => {
  if (typeof val === 'string') {
    return Number(val);
  }
  return val;
});

const employeeValidation = z.object({
  nip_pegawai: z
    .string({ message: 'NIP Pegawai harus diisi' })
    // .min(18, { message: 'NIP Pegawai harus memiliki minimal 18 karakter' })
    // .max(18, { message: 'NIP Pegawai tidak boleh lebih dari 18 karakter' })
    .regex(/^\d+$/, { message: 'NIP Pegawai hanya boleh terdiri dari angka' })
    .regex(/^(?:\d{4}\.\d{8}\.\d{2}\.\d{4}|\d{4}\.\d{2}\.\d{5})$/, {
      message:
        'Format NIP Pegawai tidak valid, harus mengikuti format yyyy.ddmmyyyy.xx.xxxx atau yyyy.mm.00000',
    }),

  nip_pns: z
    .string({ message: 'NIP PNS harus diisi' })
    // .min(18, { message: 'NIP PNS harus memiliki minimal 18 karakter' })
    // .max(18, { message: 'NIP PNS tidak boleh lebih dari 18 karakter' })
    .regex(/^\d+$/, { message: 'NIP PNS hanya boleh terdiri dari angka' })
    .optional()
    .nullable(),

  gelar_depan: z
    .string({ message: 'Gelar depan harus diisi' })
    .max(10, { message: 'Gelar depan tidak boleh lebih dari 10 karakter' })
    .optional()
    .nullable(),

  gelar_belakang: z
    .string({ message: 'Gelar belakang harus diisi' })
    .max(15, { message: 'Gelar belakang tidak boleh lebih dari 15 karakter' })
    .optional()
    .nullable(),

  nama_pegawai: z
    .string({ message: 'Nama pegawai harus diisi' })
    .min(3, { message: 'Nama pegawai minimal 3 karakter' })
    .max(100, { message: 'Nama pegawai tidak boleh lebih dari 100 karakter' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Nama pegawai hanya boleh terdiri dari huruf dan spasi',
    })
    .transform((val) => val.toString()),

  id_ms_negara_asal: ifStringOrNumber
    .pipe(
      z.number({
        required_error: 'Negara asal harus diisi',
        invalid_type_error: 'Negara asal harus berupa angka',
      }),
    )
    .optional()
    .nullable(),

  id_ms_provinsi_asal: z
    .string({ message: 'Provinsi asal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Provinsi asal hanya boleh terdiri dari angka',
    })
    .optional()
    .nullable(),

  id_ms_kota_asal: z
    .string({ message: 'Kota/Kabupaten asal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kota/Kabupaten asal hanya boleh terdiri dari angka',
    })
    .optional()
    .nullable(),

  id_ms_kecamatan_asal: z
    .string({ message: 'Kecamatan asal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kecamatan asal hanya boleh terdiri dari angka',
    })
    .optional()
    .nullable(),

  id_ms_desa_asal: z
    .string({ message: 'Desa/Kelurahan asal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Desa/Kelurahan asal hanya boleh terdiri dari angka',
    })
    .optional()
    .nullable(),

  alamat_asal: z
    .string({ message: 'Alamat asal harus diisi' })
    .optional()
    .nullable(),

  kode_pos_asal: z
    .string({ message: 'Kode pos asal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kode pos asal hanya boleh terdiri dari angka',
    })
    .optional()
    .nullable(),

  rt_asal: z
    .string({ message: 'RT asal harus diisi' })
    .max(3, { message: 'RT asal tidak boleh lebih dari 3 karakter' })
    .regex(/^\d+$/, { message: 'RT asal hanya boleh terdiri dari angka' })
    .optional()
    .nullable(),

  rw_asal: z
    .string({ message: 'RW asal harus diisi' })
    .max(3, { message: 'RW asal tidak boleh lebih dari 3 karakter' })
    .regex(/^\d+$/, { message: 'RW asal hanya boleh terdiri dari angka' })
    .optional()
    .nullable(),

  id_ms_negara_tinggal: ifStringOrNumber.pipe(
    z.number({
      required_error: 'Negara tinggal harus diisi',
      invalid_type_error: 'Negara tinggal harus berupa angka',
    }),
  ),

  id_ms_provinsi_tinggal: z
    .string({ message: 'Provinsi tinggal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Provinsi tinggal hanya boleh terdiri dari angka',
    }),

  id_ms_kota_tinggal: z
    .string({ message: 'Kota/Kabupaten tinggal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kota/Kabupaten tinggal hanya boleh terdiri dari angka',
    }),

  id_ms_kecamatan_tinggal: z
    .string({ message: 'Kecamatan tinggal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kecamatan tinggal hanya boleh terdiri dari angka',
    }),

  id_ms_desa_tinggal: z
    .string({ message: 'Desa/Kelurahan tinggal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Desa/Kelurahan tinggal hanya boleh terdiri dari angka',
    }),

  alamat_tinggal: z
    .string({ message: 'Alamat tinggal harus diisi' })
    .min(5, { message: 'Alamat tinggal minimal 5 karakter' }),

  kode_pos_tinggal: z
    .string({ message: 'Kode pos tinggal harus diisi' })
    .regex(/^\d+$/, {
      message: 'Kode pos tinggal hanya boleh terdiri dari angka',
    }),

  rt_tinggal: z
    .string({ message: 'RT tinggal harus diisi' })
    .max(3, { message: 'RT tinggal tidak boleh lebih dari 3 karakter' })
    .regex(/^\d+$/, { message: 'RT tinggal hanya boleh terdiri dari angka' }),

  rw_tinggal: z
    .string({ message: 'RW tinggal harus diisi' })
    .max(3, { message: 'RW tinggal tidak boleh lebih dari 3 karakter' })
    .regex(/^\d+$/, { message: 'RW tinggal hanya boleh terdiri dari angka' }),

  tempat_lahir: z
    .string({ message: 'Tempat lahir harus diisi' })
    .min(1, { message: 'Tempat lahir harus diisi' }),

  tgl_lahir: dateValidation,

  id_jenis_kelamin: ifStringOrNumber.refine((val) => [1, 2].includes(val), {
    message: 'Jenis kelamin harus 1 (laki-laki) atau 2 (perempuan)',
  }),

  id_ms_golongan_darah: ifStringOrNumber,

  id_ms_status_kawin: ifStringOrNumber,

  id_ms_agama: ifStringOrNumber,

  id_ms_pendidikan: ifStringOrNumber.optional(),

  id_ms_jenis_pegawai: ifStringOrNumber.optional(),

  id_ms_status_pegawai: ifStringOrNumber.optional(),

  id_ms_spesialis: ifStringOrNumber.optional(),

  id_unit_kerja: ifStringOrNumber.optional(),

  id_unit_induk: ifStringOrNumber.optional(),

  id_pangkat: ifStringOrNumber.optional(),

  id_jabatan: ifStringOrNumber.optional(),

  id_unit_jabatan: ifStringOrNumber.optional(),

  id_gaji: ifStringOrNumber.optional(),

  hp: z
    .string({ message: 'Nomor HP harus diisi' })
    .regex(/^\d+$/, { message: 'Nomor HP hanya boleh terdiri dari angka' }),

  email: z
    .string({ message: 'Email harus diisi' })
    .email({ message: 'Format email tidak valid' }),
  // .transform((val) => val.split('@')[1]),

  no_npwp: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/, {
      message: 'Format NPWP tidak valid (contoh: 12.345.678.9-012.345)',
    })
    .optional()
    .nullable(),

  no_ktp: z
    .string()
    .regex(/^\d{16}$/, {
      message: 'Nomor KTP harus 16 digit angka',
    })
    .min(16, { message: 'Nomor KTP harus 16 digit' })
    .max(16, { message: 'Nomor KTP harus 16 digit' }),

  no_ktam: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Nomor KTAM hanya boleh berisi huruf dan angka',
    })
    .optional()
    .nullable(),

  kode_arsip: z
    .string({ message: 'Kode arsip harus diisi' })
    .max(10, { message: 'Kode arsip tidak boleh lebih dari 10 karakter' })
    .optional()
    .nullable(),

  id_finger: z
    .string({ message: 'Kode arsip harus diisi' })
    .max(10, { message: 'Kode arsip tidak boleh lebih dari 10 karakter' })
    .optional()
    .nullable(),

  kode_dpjp: z
    .string()
    .regex(/^[0-9]+$/, {
      message: 'Kode DPJP hanya boleh berisi angka',
    })
    .max(10, { message: 'Kode DPJP tidak boleh lebih dari 10 karakter' })
    .optional()
    .nullable(),

  tgl_masuk: dateValidation.optional().nullable(),

  tgl_keluar: dateValidation.optional().nullable(),

  status_aktif: ifStringOrNumber.refine((val) => val === 0 || val === 1, {
    message: 'Status aktif hanya boleh bernilai 0 (tidak aktif) atau 1 (aktif)',
  }),

  status_pns: ifStringOrNumber.refine((val) => val === 0 || val === 1, {
    message: 'Status PNS hanya boleh bernilai 0 (tidak aktif) atau 1 (aktif)',
  }),

  id_pelamar: ifStringOrNumber.optional().nullable(),
});

const codeDpjpValidation = z.object({
  kode_dpjp: z
    .string()
    .regex(/^[0-9]+$/, {
      message: 'Kode DPJP hanya boleh berisi angka',
    })
    .max(10, { message: 'Kode DPJP tidak boleh lebih dari 10 karakter' }),
});

const visibilityEmployeeValidation = z.object({
  status_aktif: ifStringOrNumber.refine((val) => val === 0 || val === 1, {
    message: 'Status aktif hanya boleh bernilai 0 (tidak aktif) atau 1 (aktif)',
  }),
});

export { employeeValidation, codeDpjpValidation, visibilityEmployeeValidation };
