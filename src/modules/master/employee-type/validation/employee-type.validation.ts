import z from 'zod';

const typeOfEmployeesValidation = z.object({
  id_ms_jenis_pegawai_status: z.number({
    message: 'Status pegawai harus diisi',
  }),
  nama_jenis_pegawai: z
    .string({ message: 'Nama jenis pegawai harus diisi' })
    .min(1, { message: 'Nama jenis pegawai minimal 1 karakter' })
    .max(100, { message: 'Nama jenis pegawai maksimal 100 karakter' }),
  status: z.number({ message: 'Status harus diisi' }),
});

const updateTypeOfEmployeesStatusValidation = z.object({
  status: z.number({ message: 'Status harus diisi' }),
});

export { typeOfEmployeesValidation, updateTypeOfEmployeesStatusValidation };
