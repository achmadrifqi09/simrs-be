import z from 'zod';

const dateValidation = z
  .string()
  .refine(
    (val) => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      return regex.test(val);
    },
    {
      message: 'Tanggal tidak valid, format harus dd-mm-yyyy',
    },
  )
  .transform((val) => {
    if (/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(val)) {
      const [day, month, year] = val.split('-');
      val = `${year}-${month}-${day}`;
    }
    return new Date(val);
  });

const newPatientQueueValidation = z.object({
  nama_pasien: z.string().min(3, { message: 'Nama pasien minimal 3 karakter' }),
  jenis_pasien: z
    .number({ message: 'Jenis pasien harus di isi' })
    .min(1, { message: 'Jenis pasien harus di isi' }),
  jenis_penjamin: z
    .number({ message: 'Jenis penjamin harus di isi' })
    .min(1, { message: 'Jenis penjamin harus di isi' }),
  id_jadwal_dokter: z
    .number({ message: 'Id jadwal dokter harus di isi' })
    .min(1, { message: 'Id jadwal dokter harus di isi' }),
  tgl_lahir: dateValidation,
  no_hp: z.string().min(10, { message: 'Nomor HP harus diisi' }),
});

export { newPatientQueueValidation };
