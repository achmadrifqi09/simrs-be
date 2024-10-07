import z from 'zod';

const religionValidation = z.object({
  nama_agama: z
    .string({ message: 'Nama agama harus di isi' })
    .min(4, { message: 'Nama agama minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const religionUpdateStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { religionValidation, religionUpdateStatusValidation };
