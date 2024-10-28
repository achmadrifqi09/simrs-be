import z from 'zod';

const typeOfStatusOfficerValidation = z.object({
  status_jenis_pegawai: z
    .string({ message: 'Nama jenis pegawai harus di isi' })
    .min(4, { message: 'Nama jenis pegawai minimal 4 karakter' }),
  kode_nip: z.number({ message: 'Kode NIP harus di isi' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const typeOfStatusOfficerStatusValidation = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { typeOfStatusOfficerValidation, typeOfStatusOfficerStatusValidation };
