import z from 'zod';

const structuralPositionValidation = z.object({
  nama_jabatan: z
    .string({ message: 'Nama jabatan harus di isi' })
    .min(4, { message: 'Nama jabatan minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const structuralPositionUpdateStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export {
  structuralPositionValidation,
  structuralPositionUpdateStatusValidation,
};
