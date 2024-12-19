import z from 'zod';
import moment from 'moment-timezone';

export const updateTaskIdValidation = z.object({
  kodebooking: z
    .string({ message: 'Kode booking harus diisi' })
    .min(10, { message: 'Kode booking minimal 10 digit' }),
  taskid: z.number({ message: 'Task id harus berupa nomor' }).refine(
    (value) => {
      if ([1, 2, 3, 4, 5, 6, 7].includes(value)) return true;
      return false;
    },
    { message: 'Task id harus di antara rentang 1-7' },
  ),
  waktu: z
    .string({ message: 'Waktu harus berupa teks' })
    .refine(
      (value) => {
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value))
          return true;
        return false;
      },
      { message: 'Tanggal tidak valid, contoh 2024-12-18T13:59:00.000Z' },
    )
    .transform((value) => {
      value = value.toString().replace('.00Z', '');
      value.toString().replace('T', ' ');
      const momentDate = moment(value, 'YYYY-MM-DD HH:mm:ss').tz(
        'Asia/Jakarta',
      );
      return momentDate.valueOf();
    }),
  jenisresep: z.string().nullish(),
});
