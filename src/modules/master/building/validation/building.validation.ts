import z from 'zod';

const buildingValidation = z.object({
  nama_gedung: z
    .string({ message: 'Nama gedung harus di isi' })
    .min(4, { message: 'Nama gedung minimal 4 karakter' }),
  status: z.number({ message: 'Status gedung harus di isi' }),
});

const buildingVisibilityValidation = z.object({
  status: z.number({ message: 'Status gedung harus di isi' }),
});

export { buildingValidation, buildingVisibilityValidation };
