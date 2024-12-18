export interface TaskIdDto {
  kodebooking: string;
  taskid: number;
  waktu: number;
  jenisresep?: string;
}

export interface RegistrationTaskIdDto {
  id_pendaftaran: number;
  kode_task_id: number;
  kode_booking: string;
  tanggal_kirim: Date;
  kode_response: number;
  pesan_response: string;
  response: string;
  request_body: string;
  created_at?: Date;
  created_by?: number;
  modified_at?: Date;
}

export interface FirstUpdateTaskIdDto {
  bookingCode: string;
  startTime: string;
  regisrationId: number;
}
