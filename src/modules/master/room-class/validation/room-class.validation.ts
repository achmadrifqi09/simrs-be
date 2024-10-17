import z from 'zod';

const roomClassValidation = z.object({
  nama_kelas_kamar: z
    .string({ message: 'Nama kelas kamar harus di isi' })
    .min(2, { message: 'Nama kelas kamar minimal 2 karakter' })
    .max(50, { message: 'Nama kelas kamar maksimal 50 karakter' }),
  kode_bpjs_kamar: z
    .string({ message: 'Kode bpjs kamar harus di isi' })
    .max(10, { message: 'Kode kamar bpjs maksimal 10 karakter' }),
  status: z.number({ message: 'Status kelas kamar harus di isi' }),
});

const roomClassStatusValidation = z.object({
  status: z.number({ message: 'Status kelas kamar harus di isi' }),
});

export { roomClassValidation, roomClassStatusValidation };
