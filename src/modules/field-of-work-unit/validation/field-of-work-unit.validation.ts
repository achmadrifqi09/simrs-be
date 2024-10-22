import z from 'zod';

const fieldOfWorkUnitValidation = z.object({
  nama_bidang: z
    .string({ message: 'Nama bidang harus di isi' })
    .min(4, { message: 'Nama bidang minimal 4 karakter' }),
  status: z.number({ message: 'Status bidang harus di isi' }),
});

const statusFieldOfWorkUnitValidation = z.object({
  status: z.number({ message: 'Status bidang harus di isi' }),
});

export { fieldOfWorkUnitValidation, statusFieldOfWorkUnitValidation };
