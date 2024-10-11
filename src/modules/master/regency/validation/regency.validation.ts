import z from 'zod';

const regencyValidation = z.object({
  id: z
    .string({ message: 'Kode wilayah kabupaten/kota harus diisi' })
    .min(4, { message: 'Kode wilayah kabupaten/kota harus 4 digit' })
    .max(4, { message: 'Kode wilayah kabupaten/kota harus 4 digit' }),
  nama: z
    .string({ message: 'Nama kabupaten/kota harus di isi' })
    .min(4, { message: 'Nama kabupaten/kota minimal 4 karakter' }),
  id_provinsi: z
    .string({ message: 'Provinsi harus diisi' })
    .min(2, { message: 'Kode provinsi harus 2 digit' })
    .max(2, { message: 'Kode provinsi harus 2 digit' }),
});

export { regencyValidation };
