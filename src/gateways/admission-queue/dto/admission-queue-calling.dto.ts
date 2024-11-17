import { IsNotEmpty, IsNumber } from 'class-validator';

export class AdmissionQueueCallingDto {
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
}
