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

export { DoctorScheduleDTO, DoctorVacationDTO, AdditionalQuotaDTO };
