interface DoctorScheduleDTO {
  id_pegawai: number;
  kode_instalasi_bpjs: string;
  jenis_jadwal: number;
  hari_praktek?: number;
  tgl_praktek?: Date;
  jam_buka_praktek: string;
  jam_tutup_praktek: string;
  kuota_mjkn: number;
  kuota_online_umum: number;
  kuota_onsite: number;
  tanggal_libur?: Date;
  keterangan_libur?: string;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

interface AdditionalQuotaDTO {
  id_jadwal_dokter: number;
  kuota_mjkn: number;
  kuota_online_umum: number;
  kuota_onsite: number;
  tanggal_diterapkan: Date;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

interface QueueDoctorPracticeDTO {
  id_jadwal_dokter: number;
  kode_instalasi_bpjs: string;
  jenis_jadwal: number;
  hari_praktek: number | null;
  tgl_praktek: string | null;
  jam_buka_praktek: string;
  jam_tutup_praktek: string;
  kuota_onsite: number;
  kuota_terisi: number;
  tanggal_libur: string | null;
  keterangan_libur: string | null;
}

interface ScheduleQuota {
  id_jadwal_dokter: number;
  kuota_mjkn: number;
  kuota_online_umum: number;
  kuota_onsite: number;
}

interface ResponseDoctorScheduleDTO {
  id_pegawai: number;
  nama_dokter: string;
  gelar_depan: string;
  gelar_belakang: string;
  jadwal: QueueDoctorPracticeDTO[];
}

interface DoctorVacationDTO {
  tanggal_libur: Date | null;
  keterangan_libur: string | null;
  modified_at?: Date;
  modified_by?: number;
}

interface AdditionalQuotaDTO {
  id_jadwal_dokter: number;
  kuota_mjkn: number;
  kuota_online_umum: number;
  kuota_onsite: number;
  tanggal_diterapkan: Date;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

interface CurrentDoctorScheduleDTO {
  id_pegawai: number;
  nama_pegawai: string;
  gelar_depan: string | null;
  gelar_belakang: string | null;
  id_jadwal_dokter: number;
  kode_instalasi_bpjs: string;
  jenis_jadwal: number;
  hari_praktek: number | null;
  tgl_praktek: string | null;
  jam_buka_praktek: string;
  jam_tutup_praktek: string;
  kuota_onsite: number;
  kuota_terisi: number;
  tanggal_libur: string | null;
  keterangan_libur: string | null;
}

export {
  DoctorScheduleDTO,
  DoctorVacationDTO,
  AdditionalQuotaDTO,
  CurrentDoctorScheduleDTO,
  ResponseDoctorScheduleDTO,
  ScheduleQuota,
};
