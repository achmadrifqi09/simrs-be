import z from 'zod';

const employeeStatusValidation = z.object({
  nama_status_pegawai: z
    .string({ message: 'Nama status pegawai harus di isi' })
    .min(4, { message: 'Nama status pegawai minimal 4 karakter' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const employeeVisibilityValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { employeeStatusValidation, employeeVisibilityValidation };
