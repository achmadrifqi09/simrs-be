import z from 'zod';

const socialStatusValidation = z.object({
  nama_status_sosial: z
    .string({ message: 'Nama status sosial harus di isi' })
    .min(3, { message: 'Nama status sosial minimal 3 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const socialStatusVisibilityValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { socialStatusValidation, socialStatusVisibilityValidation };
