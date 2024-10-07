import z from 'zod';

const bloodTypeValidation = z.object({
  nama_golongan_darah: z
    .string({ message: 'Nama golongan darah harus di isi' })
    .min(1, { message: 'Nama golongan darah minimal 1 karakter' })
    .max(2, { message: 'Nama golongan darah maksimal 2 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const bloodTypeUpdateStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { bloodTypeValidation, bloodTypeUpdateStatusValidation };
