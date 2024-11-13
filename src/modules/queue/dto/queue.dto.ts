export interface NewPatientPayload {
  nama_pasien: string;
  jenis_pasien: number;
  jenis_penjamin: number;
  no_bpjs?: string;
  no_hp?: string;
  id_jadwal_dokter: number;
  tgl_lahir: Date;
}

export interface NewPatient {
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
  created_at: Date;
}

export interface ResponseNewPatient {
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
}

export interface DailyQueueSummary {
  jumlah_antrian_onsite: number;
  sisa_antrian_onsite: number;
}

export interface DoctorRemainingQuota {
  jumlah_antrian: number;
  kuota_tersedia: number;
}
