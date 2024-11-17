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

const oldPatientQueueValidation = z.object({
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
  no_bpjs: z
    .string()
    .min(13, { message: 'Nomor BPJS harus 13 digit' })
    .max(13, { message: 'Nomor BPJS harus 13 digit' })
    .nullish(),
  kode_rm: z
    .string()
    .min(7, { message: 'Nomor RM harus 7 digit' })
    .max(7, { message: 'Nomor RM harus 7 digit' }),
});

const updateQueueCounterIdValidation = z.object({
  id_ms_loket_antrian: z
    .number()
    .min(1, { message: 'Id loket antrian harus di isi' }),
});

export {
  newPatientQueueValidation,
  oldPatientQueueValidation,
  updateQueueCounterIdValidation,
};
