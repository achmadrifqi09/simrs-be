import z from 'zod';

const provinceValidation = z.object({
  id: z
    .string({ message: 'Kode wilayah provinsi harus diisi' })
    .min(2, { message: 'Kode wilayah harus 2 digit' })
    .max(2, { message: 'Kode wilayah harus 2 digit' }),
  nama: z
    .string({ message: 'Nama provinsi darah harus di isi' })
    .min(4, { message: 'Nama provinsi minimal 4 karakter' }),
  id_negara: z.number({ message: 'Negara harus di isi' }),
});

export { provinceValidation };
