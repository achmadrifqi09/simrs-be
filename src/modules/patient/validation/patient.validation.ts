import { z } from 'zod';
import moment from 'moment-timezone';

const phoneNumberRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
const dateValidation = z
  .string({ message: 'Tanggal lahir harus diisi' })
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

const patientValidation = z
  .object({
    id_pasien: z.number().int().optional(),
    nama_pasien: z
      .string({ message: 'Nama pasien harus diisi' })
      .max(100, 'Nama Pasien tidak boleh melebihi 100 karakter'),
    tempat_lahir: z
      .string({ message: 'Tempat lahir harus diisi' })
      .max(100, 'Tempat Lahir tidak boleh melebihi 100 karakter'),
    tgl_lahir: dateValidation,
    jenis_kelamin: z
      .number({ message: 'Jenis kelamin harus diisi' })
      .int()
      .min(1)
      .max(2, 'Jenis Kelamin harus 1 (Laki-laki) atau 2 (Perempuan)'),
    id_warga_negara: z
      .number({ message: 'Warga negara harus diisi' })
      .int()
      .refine((value) => value > 0, { message: 'ID Warga Negara harus valid' }),
    identitas_pasien: z
      .number({ message: 'Identitas pasien harus diisi' })
      .int(),
    no_identitas: z
      .string()
      .max(100, 'No Identitas tidak boleh melebihi 100 karakter'),
    no_bpjs: z
      .string()
      .max(50, 'No BPJS tidak boleh melebihi 50 karakter')
      .nullish(),
    no_hp: z
      .string({ message: 'Nomor hp harus diisi' })
      .regex(phoneNumberRegex, 'No HP harus berupa nomor telepon yang valid')
      .max(20),
    id_ms_negara_tinggal: z
      .number({ message: 'Negara tinggal harus diisi' })
      .min(1, { message: 'Negara tinggal harus diisi' })
      .int()
      .refine((value) => value > 0, {
        message: 'ID Negara Tinggal harus valid',
      }),
    id_ms_provinsi_tinggal: z
      .string({
        message: 'Provinsi Tinggal harus diisi',
      })
      .min(1, { message: 'Provinsi tinggal harus diisi' }),
    id_ms_kota_tinggal: z
      .string({ message: 'Kota Tinggal harus diisi' })
      .min(1, { message: 'Kota tinggal harus diisi' }),
    id_ms_kecamatan_tinggal: z
      .string({
        message: 'Kecamatan Tinggal harus diisi',
      })
      .min(1, { message: 'Kecamatan tinggal harus diisi' }),
    id_ms_desa_tinggal: z
      .string({ message: 'Desa Tinggal harus diisi' })
      .min(1, { message: 'Desa tinggal harus diisi' }),
    alamat_tinggal: z
      .string({ message: 'Alamat Tinggal harus diisi' })
      .min(1, { message: 'Alamat tinggal harus diisi' }),
    rt_tinggal: z
      .string({ message: 'RT tinggal harus diisi' })
      .min(1, { message: 'RT tinggal harus diisi' })
      .max(5, 'RT Tinggal tidak boleh melebihi 5 karakter'),
    rw_tinggal: z
      .string({ message: 'RT tinggal harus diisi' })
      .min(1, { message: 'RW tinggal harus diisi' })
      .max(5, 'RW Tinggal tidak boleh melebihi 5 karakter'),
    kode_pos_tinggal: z.string().max(10).nullish(),
    alamatgab_tinggal: z.string().nullish(),
    nama_pekerjaan: z.string().nullish(),
    id_ms_negara_asal: z
      .number({ message: 'Negara asal harus di si' })
      .min(1, { message: 'Negara asal harus diisi' })
      .int()
      .refine((value) => value > 0, { message: 'Negara Asal harus valid' }),
    id_ms_provinsi_asal: z
      .string({ message: 'Provinsi Asal harus diisi' })
      .min(1, { message: 'Provinsi asal harus diisi' }),
    id_ms_kota_asal: z
      .string({ message: 'Kota Asal harus diisi' })
      .min(1, { message: 'Kota asal harus diisi' }),
    id_ms_kecamatan_asal: z
      .string({ message: 'Kecamatan Asal harus diisi' })
      .min(1, { message: 'Negara asal harus diisi' }),
    id_ms_desa_asal: z
      .string({ message: 'Desa asal harus diisi' })
      .min(1, { message: 'Desa asal harus diisi' }),
    alamat_asal: z
      .string({ message: 'Alamat Asal harus diisi' })
      .min(1, { message: 'Alamat asal harus diisi' }),
    rt_asal: z
      .string({ message: 'RT asal harus diisi' })
      .min(1, { message: 'RT asal harus diisi' })
      .max(5, 'RT Asal tidak boleh melebihi 5 karakter'),
    rw_asal: z
      .string({ message: 'RW Asal harus diisi' })
      .min(1, { message: 'RW asal harus diisi' })
      .max(5, 'RW Asal tidak boleh melebihi 5 karakter'),
    kode_pos_asal: z.string().max(10).nullish(),
    alamatgab_asal: z.string().nullish(),
    suku: z.string().max(50).nullish(),
    nama_ibu_kandung: z.string().max(100).nullish(),
    id_ms_status_kawin: z
      .number({ message: 'Status kawin harus diisi' })
      .min(1, { message: 'Status kawin harus diisi' })
      .int(),
    id_ms_golongan_darah: z
      .number({ message: 'Golongan darah harus diisi' })
      .min(1, { message: 'Golongan darah harus diisi' })
      .int(),
    id_ms_agama: z
      .number({ message: 'Agama harus diisi' })
      .min(1, { message: 'Agama harus diisi' })
      .int()
      .refine((value) => value > 0, { message: 'Agama tidak valid' }),
    id_ms_pendidikan: z
      .number({ message: 'Pendidikan harus diisi' })
      .min(1, { message: 'Pendidikan harus diisi' })
      .int()
      .refine((value) => value > 0, { message: 'Pendidikan tidak valid' }),
    live: z.number().int().default(1),
  })
  .refine(
    (value) => {
      const isSeventeen = isSeventeenYearsOld(formatBirthDate(value.tgl_lahir));

      return !(isSeventeen && value.no_identitas.length <= 8);
    },
    { message: 'Nomor identitas tidak valid', path: ['no_identitas'] },
  )
  .refine(
    (value) => {
      const isSeventeen = isSeventeenYearsOld(formatBirthDate(value.tgl_lahir));

      return !(isSeventeen && ![1, 2].includes(value.identitas_pasien));
    },
    {
      message: 'Pasien harus menyertakan identitas yang valid',
      path: ['identitas_pasien'],
    },
  );

const formatBirthDate = (date: string | Date) => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  const [day, month, year] = date.toString().split('-');
  return `${year}-${month}/${day}`;
};

const isSeventeenYearsOld = (birthDate: string) => {
  const birthDateMoment = moment(birthDate, 'YYYY-MM-DD');
  const currentDate = moment();

  const age = currentDate.diff(birthDateMoment, 'years');
  return (
    age > 17 &&
    currentDate.isSameOrAfter(birthDateMoment.clone().add(17, 'years'))
  );
};

export { patientValidation };
