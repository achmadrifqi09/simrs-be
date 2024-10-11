import z from 'zod';

const villageValidation = z.object({
  id: z
    .string({ message: 'Kode wilayah desa harus diisi' })
    .min(10, { message: 'Kode wilayah desa harus 10 digit' })
    .max(10, { message: 'Kode wilayah desa harus 10 digit' }),
  nama: z
    .string({ message: 'Nama desa harus di isi' })
    .min(4, { message: 'Nama desa minimal 4 karakter' }),
  id_kecamatan: z
    .string({ message: 'Kecamatan harus diisi' })
    .min(6, { message: 'Kode kecamatan harus 6 digit' })
    .max(6, { message: 'Kode kecamatan harus 6 digit' }),
});

export { villageValidation };
