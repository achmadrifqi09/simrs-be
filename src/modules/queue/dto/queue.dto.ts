export interface RegisterQueuePayload {
  nama_pasien: string;
  jenis_pasien: number;
  jenis_penjamin: number;
  no_bpjs?: string;
  no_hp?: string;
  id_jadwal_dokter: number;
  tgl_lahir: Date;
  kode_rm?: string;
}

export interface QueueAttendancePayload {
  id_antrian: number;
  id_user: number;
  id_ms_loket_antrian: number;
}

export interface QueueAttendancePayloadInput {
  id_ms_loket_antrian: number;
  status_panggil: number;
  status: number;
  tgl_panggil: Date;
  modified_at?: Date;
  modified_by?: number;
}

export interface StatusPayload {
  id_antrian: number;
  status_panggil: number;
  id_user: number;
  status: number;
}

export interface StatusPayloadInput {
  status: number;
  status_panggil: number;
  modified_at?: Date;
  modified_by?: number;
}

export interface CounterIdUpdatePayload {
  id_ms_loket_antrian: number;
  modified_at?: Date;
  modified_by?: number;
}

export interface CallStatusUpdatePayload {
  id_antrian: number;
  id_user: number;
  status_panggil?: number;
  id_ms_loket_antrian: number;
}

export interface CallStatusUpdateInput {
  id_ms_loket_antrian: number;
  status_panggil: number;
  modified_at?: Date;
  modified_by?: number;
}

export interface CallStatusUpdate {
  id_antrian?: number;
  status_panggil: number;
  modified_at?: Date;
  modified_by?: number;
}

export interface CallingQueuePayload {
  id_antrian?: number;
  id_ms_loket_antrian: number;
  user_id: number;
}

export interface PatientQueue {
  nama_pasien: string;
  jenis_pasien: number;
  jenis_penjamin: number;
  no_bpjs?: string;
  no_rujukan?: string | null;
  no_hp?: string;
  id_jadwal_dokter: number;
  tgl_lahir: Date;
  kode_antrian: string;
  no_antrian: number;
  status: number;
  status_panggil: number;
  kode_rm?: string;
  created_at: Date;
}

export interface QueueResponse {
  nama_pasien: string;
  jenis_pasien: number;
  jenis_penjamin: number;
  no_bpjs?: string;
  no_hp?: string;
  id_jadwal_dokter: number;
  tgl_lahir: Date;
  kode_antrian: string;
  no_antrian: number;
  status: number;
  status_panggil: number;
  sisa_antrian_onsite: number;
  dokter: string;
  poliklinik: string;
  created_at?: Date;
}

export interface Identifier {
  type: number;
  number: string | null;
}

export interface QueueNumber {
  kode_antrian: string;
  no_antrian: number;
}

export interface DailyQueueSummary {
  jumlah_antrian_onsite: number;
  sisa_antrian_onsite: number;
}

export interface QueueDisplay {
  id_antrian: number;
  kode_antrian: string;
  no_antrian: number;
}

export interface CounterDisplayWS {
  id_ms_loket_antrian: number;
  jenis_loket: number;
  nama_loket: string;
  antrian: QueueDisplay[];
}
