import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdmissionQueueInitDto {
  @IsNumber(
    {},
    {
      message: 'Id loket antrian harus berupa angka',
    },
  )
  @IsNotEmpty({
    message: 'Id loket antrian harus di isi',
  })
  counter_id: number;

  @IsString({
    message: 'Kode antrian harus berupa teks',
  })
  @IsNotEmpty({
    message: 'Kode antrian harus di isi',
  })
  queue_code: string;
}
