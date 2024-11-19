import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdmissionDto {
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

  @IsString({
    message: 'Kode antrian harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Kode antrian harus di isi',
  })
  kode_antrian: string;

  @IsNumber(
    {},
    {
      message: 'Id user harus berupa angka',
    },
  )
  @IsNotEmpty({
    message: 'Id user harus di isi',
  })
  id_user: number;
}
