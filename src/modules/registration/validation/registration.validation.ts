import z from 'zod';

export const cancellationValidation = z.object({
  status_batal: z.number({ message: 'Status batal harus diisi' }).refine(
    (value) => {
      return /^[01]$/.test(value.toString());
    },
    {
      message: 'Status batal tidak sesuai',
    },
  ),
  keterangan_batal: z.string().min(4, 'Keterangan batal minimal 4 karakter'),
});

const dateValidation = z
  .string({ message: 'Tanggal harus diisi' })
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
  })
  .nullish();

const phoneNumberRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
export const registrationValidation = z
  .object({
    cob: z.number().nullish(),
    no_cob: z.string().nullish(),
    nama_wali: z
      .string({ message: 'Nama wali harus di isi' })
      .min(3, { message: 'Nama wali minimal 4 karakter' })
      .max(50, { message: 'Nama wali tidak boleh lebih dari 50 karakter' }),
    telp_wali: z
      .string({ message: 'Nomor hp wali harus diisi' })
      .regex(
        phoneNumberRegex,
        'Nomor hp wali harus berupa nomor telepon yang valid',
      )
      .max(14, { message: 'Nomor hp wlai makasimal 14 digit' }),
    id_hub_wali: z
      .number({ message: 'Id hubungan wali harus berupa angka' })
      .nullish(),
    asal_rujukan: z
      .string()
      .max(100, { message: 'Asal rujukan tidak boleh lebih dari 50 karakter' }),
    nama_perujuk: z
      .string()
      .max(100, { message: 'Nama perujuk tidak boleh lebih dari 50 karakter' })
      .nullish(),
    ket_rujukan: z
      .string()
      .max(100, { message: 'Nama perujuk tidak boleh lebih dari 50 karakter' })
      .nullish(),
    status_rujukan: z
      .number({ message: 'Status rujukan harus berupa angka' })
      .nullish(),
    nomor_rujuk_balik: z
      .string()
      .max(50, {
        message: 'Nomor rujukan balik/kontrol tidak boleh dari 50 karakter',
      })
      .nullish(),
    no_rujukan: z
      .string()
      .max(50, {
        message: 'Nomor rujukan balik/kontrol tidak boleh dari 50 karakter',
      })
      .nullish(),
    tgl_rujukan: dateValidation.optional(),
    id_asuransi: z
      .number({ message: 'Id asuransi harus berupa nomor' })
      .nullish(),
    nomor_asuransi: z
      .string()
      .max(50, { message: 'Nomor asuransi tidak boleh dari 50 karakter' })
      .nullish(),
  })
  .refine(
    (value) => {
      if (!value?.id_asuransi && !value?.nomor_asuransi) return true;
      return !!(value?.id_asuransi && value?.nomor_asuransi);
    },
    { message: 'Nomor asuransi harus di isi dan minimal 4 karakter' },
  )
  .refine(
    (value) => {
      if (
        Number(value.status_rujukan) === 3 &&
        !value.nomor_rujuk_balik &&
        value.nomor_rujuk_balik.length < 16
      )
        return false;
      return true;
    },
    {
      message:
        'Harus menyertakan nomor kontrol yang valid untuk jenis rujukan kontrol',
    },
  )
  .refine(
    (value) => {
      if (
        value.id_asuransi === 1 &&
        (!value.no_rujukan || value.no_rujukan === '')
      )
        return false;
      return true;
    },
    {
      message: 'Pasien BPJS wajib menyertakan nomor rujukan',
      path: ['no_rujukan'],
    },
  );
