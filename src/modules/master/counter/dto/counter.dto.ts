export interface CounterPayloadDTO {
  nama_loket: string;
  keterangan: string | undefined | null;
  jenis_loket: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

export interface Counter {
  id_ms_loket_antrian: number;
  nama_loket: string;
  jenis_loket: number;
}
