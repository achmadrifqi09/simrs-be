import z from 'zod';

const insuranceValidation = z.object({
  nama_asuransi: z
    .string({ message: 'Nama asuransi harus di isi' })
    .min(3, { message: 'Nama asuransi minimal 3 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const insuranceStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { insuranceValidation, insuranceStatusValidation };
