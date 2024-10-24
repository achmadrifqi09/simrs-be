import z from 'zod';

const workUnitValidation = z.object({
  nama_unit_kerja: z
    .string({ message: 'Nama unit kerja harus diisi' })
    .min(4, { message: 'Nama unit kerja minimal 4 karakter' })
    .max(100, { message: 'Nama unit kerja maksimal 100 karakter' }),
  jenis_pelayanan: z
    .number({ message: 'Jenis pelayanan harus di isi' })
    .min(0, { message: 'Jenis pelayanan harus di isi' })
    .max(3, { message: 'Jenis pelayanan tidak valid' }),
  kode_instalasi_bpjs: z.string().nullish(),
  status_antrian: z
    .number()
    .min(0, { message: 'Status antrean harus di isi' })
    .max(1, { message: 'Status antrean unit kerja tidak valid' }),
  status: z
    .number({ message: 'Status unit kerja harus diisi' })
    .min(0, { message: 'Status unit kerja isi' })
    .max(1, { message: 'Status unit kerja tidak valid' }),
  id_unit_induk: z.number().nullish(),
  id_bidang: z.number().nullish(),
  is_parent_unit: z
    .number()
    .min(0, { message: 'Unit kerja induk tidak valid' })
    .max(1, { message: 'Unit kerja induk tidak valid' }),
});

const workUnitStatusValidation = z.object({
  status: z
    .number()
    .min(0, { message: 'Status unit kerja isi' })
    .max(1, { message: 'Status unit kerja tidak valid' }),
});

const workUnitQueueStatusValidation = z.object({
  status_antrian: z
    .number()
    .min(0, { message: 'Status antrean harus di isi' })
    .max(1, { message: 'Status antrean unit kerja tidak valid' }),
});

export {
  workUnitValidation,
  workUnitStatusValidation,
  workUnitQueueStatusValidation,
};
