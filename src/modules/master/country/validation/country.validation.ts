import z from 'zod';

const countryValidation = z.object({
  nama_negara: z
    .string({ message: 'Nama negara harus di isi' })
    .min(4, { message: 'Nama negara minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const countryStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { countryValidation, countryStatusValidation };
