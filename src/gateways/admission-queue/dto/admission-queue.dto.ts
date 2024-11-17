import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdmissionQueueDto {
  @IsNumber(
    {},
    {
      message: 'Id antrian harus berupa angka',
    },
  )
  @IsNotEmpty({
    message: 'Id antrian harus di isi',
  })
  id_antrian: number;

  @IsNumber(
    {},
    {
      message: 'Id loket antrian harus berupa angka',
    },
  )
  @IsNotEmpty({
    message: 'Id loket antrian harus di isi',
  })
  id_ms_loket_antrian: number;

  @IsNumber(
    {},
    {
      message: 'Id user harus berupa angka',
    },
  )
  @IsNotEmpty({
    message: 'Id user antrian harus di isi',
  })
  user_id: number;

  @IsString({
    message: 'Kode antrian harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Kode antrian harus di isi',
  })
  kode_antrian: string;
}
