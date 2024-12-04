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

export const registrationValidation = z.object({
  cob: z.number().nullish(),
  no_cob: z.string().nullish(),
  nama_wali: z
    .string()
    .max(50, { message: 'Nama wali tidak boleh lebih dari 50 karakter' })
    .nullish(),
  telp_wali: z
    .string()
    .max(50, { message: 'Telepon wali tidak boleh lebih dari 50 karakter' })
    .nullish(),
  id_hub_wali: z.string().nullish(),
  asal_rujukan: z
    .string()
    .max(100, { message: 'Asal rujukan tidak boleh lebih dari 50 karakter' })
    .nullish(),
  nama_perujuk: z
    .string()
    .max(100, { message: 'Nama perujuk tidak boleh lebih dari 50 karakter' })
    .nullish(),
  ket_rujukan: z
    .string()
    .max(100, { message: 'Nama perujuk tidak boleh lebih dari 50 karakter' })
    .nullish(),
});

/*
 * cob
 * no asuransi cob
 * nama_wali
 * telp_wali
 * id_hub_wali
 * asal_rujukan
 * nama_perujuk
 * ket_rujukan

 * BPJS
 * status rujukan
 * nomor_rujuk_balik
 * tgl rujukan

 * UMUM
 * penjamin
 * no asuransi
 * */
