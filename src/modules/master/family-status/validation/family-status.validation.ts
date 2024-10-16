import z from 'zod';

const familyStatusValidation = z.object({
  nama_status_keluarga: z
    .string({ message: 'Nama status keluarga harus di isi' })
    .min(4, { message: 'Nama status keluarga minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const familyStatusVisibilityValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { familyStatusValidation, familyStatusVisibilityValidation };
