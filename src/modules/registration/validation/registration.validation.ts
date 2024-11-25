import z from 'zod';

export const cancellationValidation = z.object({
  status_batal: z.number({ message: 'Status batal harus diisi' }).refine(
    (value) => {
      return /^[01]$/.test(value.toString());
    },
    {
      message: 'Status batal tidak sesuai',
    },
  ),
  keterangan_batal: z.string().min(4, 'Keterangan batal minimal 4 karakter'),
});
