import z from 'zod';

const educationLevelValidation = z.object({
  nama_tingkat_pendidikan: z
    .string({ message: 'Nama tingkat pendidikan harus di isi' })
    .min(4, {
      message:
        'Nama tingkat pendidikan minimal 4 karakter (Tidak diperbolekan singkatan)',
    }),
  status: z.number({ message: 'Status tingakt pendidikan  harus di isi' }),
});

const educationLevelVisibilityValidation = z.object({
  status: z.number({ message: 'Status tingakt pendidikan harus di isi' }),
});

export { educationLevelValidation, educationLevelVisibilityValidation };
