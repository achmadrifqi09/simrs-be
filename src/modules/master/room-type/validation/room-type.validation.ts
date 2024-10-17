import z from 'zod';

const roomTypeValidation = z.object({
  nama_jenis_kamar: z
    .string({ message: 'Nama jenis kamar harus di isi' })
    .min(2, { message: 'Nama jenis kamar minimal 2 karakter' }),
  id_kamar_kelas: z.number({ message: 'Kelas kamar harus di isi' }),
  status: z.number({ message: 'Status jenis kamar harus di isi' }),
});

const roomTypeStatusValidation = z.object({
  status: z.number({ message: 'Status janis kamar harus di isi' }),
});

export { roomTypeValidation, roomTypeStatusValidation };
