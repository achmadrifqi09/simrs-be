import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AdmissionQueueSkippedDto {
  @IsNumber(
    {},
    {
      message: 'Id antrian harus berupa angka',
    },
  )
  @IsNotEmpty({ message: 'Id antrian tidak boleh kosong' })
  id_antrian: number;

  @IsNumber(
    {},
    {
      message: 'Id antrian harus berupa angka',
    },
  )
  @IsNotEmpty({ message: 'Id user tidak boleh kosong' })
  user_id: number;

  @IsNumber(
    {},
    {
      message: 'Id antrian harus berupa angka',
    },
  )
  @IsOptional()
  status_paggil: number;

  @IsNumber(
    {},
    {
      message: 'Id antrian harus berupa angka',
    },
  )
  @IsNotEmpty({ message: 'Id loket antrian tidak boleh kosong' })
  id_ms_loket_antrian: number;

  @IsString({
    message: 'Kode antrian harus berupa teks',
  })
  @IsNotEmpty({ message: 'Kode antrian tidak boleh kosong' })
  kode_antrian: string;
}
