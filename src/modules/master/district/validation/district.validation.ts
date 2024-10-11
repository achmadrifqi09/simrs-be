import z from 'zod';

const districtValidation = z.object({
  id: z
    .string({ message: 'Kode wilayah kecamatan harus diisi' })
    .min(6, { message: 'Kode wilayah kecamatan harus 6 digit' })
    .max(6, { message: 'Kode wilayah kecamatan harus 6 digit' }),
  nama: z
    .string({ message: 'Nama kecamatan darah harus di isi' })
    .min(4, { message: 'Nama kecamatan minimal 4 karakter' }),
  id_kabkot: z
    .string({ message: 'Kabupaten/kota harus diisi' })
    .min(4, { message: 'Kode kabupaten/kota harus 4 digit' })
    .max(4, { message: 'Kode kabupaten/kota harus 4 digit' }),
});

export { districtValidation };
