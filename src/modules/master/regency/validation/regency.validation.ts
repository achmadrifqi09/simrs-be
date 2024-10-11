import z from 'zod';

const regencyValidation = z.object({
  id: z
    .string({ message: 'Kode wilayah provinsi harus diisi' })
    .min(4, { message: 'Kode wilayah harus 4 digit' })
    .max(4, { message: 'Kode wilayah harus 4 digit' }),
  nama: z
    .string({ message: 'Nama provinsi darah harus di isi' })
    .min(4, { message: 'Nama provinsi minimal 4 karakter' }),
  id_provinsi: z
    .string({ message: 'Provinsi harus diisi' })
    .min(2, { message: 'Kode provinsi harus 2 digit' })
    .max(2, { message: 'Kode provinsi harus 2 digit' }),
});

export { regencyValidation };
