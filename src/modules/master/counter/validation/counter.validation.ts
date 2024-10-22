import z from 'zod';

const counterValidation = z.object({
  nama_loket: z
    .string({ message: 'Nama loket harus di isi' })
    .min(3, { message: 'Nama loket minimal 3 karakter' }),
  keterangan: z.string().nullable(),
  jenis_loket: z.number({ message: 'Jenis loket harus di isi' }),
  status: z.number({ message: 'Status loket harus di isi' }),
});

const counterStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { counterValidation, counterStatusValidation };
