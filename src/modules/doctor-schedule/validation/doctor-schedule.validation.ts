import z from 'zod';

const DateValidation = z.union([
  z
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
    }),
  z.null(),
]);

const doctorVacationValidation = z.object({
  tanggal_libur: z
    .string({ message: 'Tanggal libur harus di isi' })
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
    }),
  keterangan_libur: z
    .string()
    .min(4, { message: 'Keterangan libur minimal 4 karakter' }),
});

const additionalDoctorQuotaValidation = z.object({
  kuota_mjkn: z.number({ message: 'Kuota MJKN harus di isi' }),
  kuota_online_umum: z.number({ message: 'Kuota online umum harus di isi' }),
  kuota_onsite: z.number({ message: 'Kuota onsite harus di isi' }),
  tanggal_diterapkan: z
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
    }),
});

const doctorScheduleValidation = z.object({
  id_pegawai: z
    .number({ message: 'Dokter harus di isi' })
    .min(1, { message: 'Dokter minimal 1 karakter' }),
  kode_instalasi_bpjs: z
    .string({ message: 'Kode poli harus di isi' })
    .min(3, { message: 'Kode poli minimal 3 karakter' }),
  jenis_jadwal: z
    .number({ message: 'Jenis jadwal harus di isi' })
    .min(1, { message: 'Jenis jadwal harus perhari/pertanggal' })
    .max(2, { message: 'Jenis jadwal harus perhari/pertanggal' }),
  hari_praktek: z
    .number({ message: 'Hari praktek harus di isi' })
    .min(1, { message: 'Hari praktek harus senin - minggu' })
    .max(7, { message: 'Hari praktek harus senin - minggu' })
    .nullish(),
  tgl_praktek: DateValidation.optional(),
  jam_buka_praktek: z
    .string()
    .regex(/^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, {
      message: 'Jam buka praktek harus berformat HH:mm:ss',
    }),
  jam_tutup_praktek: z
    .string()
    .regex(/^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, {
      message: 'Jam tutup praktek harus berformat HH:mm:ss',
    }),
  kuota_mjkn: z.number({ message: 'Kuota MJKN harus di isi' }),
  kuota_online_umum: z.number({ message: 'Kuota online umum harus di isi' }),
  kuota_onsite: z.number({ message: 'Kuota onsite harus di isi' }),
  tanggal_libur: DateValidation.optional(),
  keterangan_libur: z.string().nullish(),
});

export {
  doctorScheduleValidation,
  doctorVacationValidation,
  additionalDoctorQuotaValidation,
};
