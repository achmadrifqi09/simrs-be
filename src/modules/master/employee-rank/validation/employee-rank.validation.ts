import z from 'zod';

const rankOfEmployeesValidation = z.object({
  nama_pangkat: z
    .string({ message: 'Nama pangkat harus di isi' })
    .min(4, { message: 'Nama pangkat minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const rankOfEmployeesStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { rankOfEmployeesValidation, rankOfEmployeesStatusValidation };
