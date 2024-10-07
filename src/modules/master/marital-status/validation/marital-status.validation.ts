import z from 'zod';

const maritalStatusValidation = z.object({
  nama_status_kawin: z
    .string({ message: 'Nama status kawin harus di isi' })
    .min(4, { message: 'Nama status kawin minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const maritalStatusVisibilityValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { maritalStatusValidation, maritalStatusVisibilityValidation };
