import z from 'zod';

const specialistValidation = z.object({
  nama_spesialis: z
    .string({ message: 'Nama spesialis harus di isi' })
    .min(4, { message: 'Nama spesialis minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const specialistStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { specialistValidation, specialistStatusValidation };
