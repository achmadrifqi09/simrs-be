import z from 'zod';

const roomValidation = z.object({
  id_ms_kamar_jenis: z.number({ message: 'Jenis kamar harus di isi' }),
  id_gedung: z.number({ message: 'Gedung kamar harus di isi' }),
  lantai: z.number({ message: 'Lantai kamar harus di isi' }),
  nama_kamar: z
    .string({ message: 'Nama kelas kamar harus di isi' })
    .min(2, { message: 'Nama kelas kamar minimal 2 karakter' })
    .max(50, { message: 'Nama kelas kamar maksimal 50 karakter' }),
  status: z.number({ message: 'Status kamar harus di isi' }),
});

const roomStatusValidation = z.object({
  status: z.number({ message: 'Status kamar harus di isi' }),
});

export { roomValidation, roomStatusValidation };
