import z from 'zod';

const provinceValidation = z.object({
  id: z.string({ message: 'Kode wilayah provinsi harus diisi' }),
  nama: z
    .string({ message: 'Nama provinsi darah harus di isi' })
    .min(4, { message: 'Nama provinsi darah minimal 4 karakter' }),
  id_negara: z.number({ message: 'Negara harus di isi' }),
});

export { provinceValidation };
