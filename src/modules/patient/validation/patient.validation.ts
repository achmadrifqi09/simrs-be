import { z } from 'zod';

const phoneNumberRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
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

const patientValidation = z.object({
  id_pasien: z.number().int().optional(),
  kode_rm: z.string().max(20, 'Kode RM tidak boleh melebihi 20 karakter'),
  nama_pasien: z
    .string()
    .max(100, 'Nama Pasien tidak boleh melebihi 100 karakter'),
  tempat_lahir: z
    .string()
    .max(100, 'Tempat Lahir tidak boleh melebihi 100 karakter'),
  tgl_lahir: dateValidation,
  jenis_kelamin: z
    .number()
    .int()
    .min(1)
    .max(2, 'Jenis Kelamin harus 1 (Laki-laki) atau 2 (Perempuan)'),
  id_warga_negara: z.number().int(),
  identitas_pasien: z.number().int(),
  no_identitas: z
    .string()
    .max(100, 'No Identitas tidak boleh melebihi 100 karakter'),
  no_bpjs: z.string().max(50, 'No BPJS tidak boleh melebihi 50 karakter'),
  no_hp: z
    .string()
    .regex(phoneNumberRegex, 'No HP harus berupa nomor telepon yang valid')
    .max(20),
  id_ms_negara_tinggal: z.number().int(),
  id_ms_provinsi_tinggal: z.string(),
  id_ms_kota_tinggal: z.string(),
  id_ms_kecamatan_tinggal: z.string(),
  id_ms_desa_tinggal: z.string(),
  alamat_tinggal: z.string(),
  rt_tinggal: z.string().max(5),
  rw_tinggal: z.string().max(5),
  kode_pos_tinggal: z.string().max(10).nullish(),
  alamatgab_tinggal: z.string(),
  suku: z.string().max(50).nullish(),
  nama_ibu_kandung: z.string().max(100).nullish(),
  id_ms_status_kawin: z.number().int().default(0),
  id_ms_golongan_darah: z.number().int().default(0),
  id_ms_agama: z.number().int(),
  live: z.number().int().default(1),
  rt_asal: z.string().max(5),
  rw_asal: z.string().max(5),
});

export { patientValidation };
