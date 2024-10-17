import z from 'zod';

const bedValidation = z.object({
  id_ms_kamar: z.number({ message: 'Kamar harus di isi' }),
  nama_bed: z
    .string({ message: 'Nama bed harus di isi' })
    .min(1, { message: 'Nama bed minimal 1 karakter' })
    .max(50, { message: 'Nama bed maksimal 50 karakter' }),
  keterangan: z.string({ message: 'Keterangan harus diisi' }),
  status_bed: z.number({ message: 'Status ketersediaan bed harus di isi' }),
  status: z.number({ message: 'Status harus di isi' }),
});

const updateBedAvailabilityValidation = z.object({
  status_bed: z.number({ message: 'Status ketersediaan harus di isi' }),
});

const updateVisibilityBed = z.object({
  status: z.number({ message: 'Status harus di isi' }),
});

export { bedValidation, updateVisibilityBed, updateBedAvailabilityValidation };
