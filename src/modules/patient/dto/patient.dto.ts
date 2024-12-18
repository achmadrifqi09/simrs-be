export interface PatientDTO {
  id_pasien?: number;
  kode_rm?: string;
  nama_pasien: string;
  tempat_lahir: string;
  tgl_lahir: Date;
  jenis_kelamin: number;
  identitas_pasien: number;
  no_identitas: string;
  no_bpjs: string;
  no_hp: string;
  id_ms_negara_tinggal: number;
  id_ms_provinsi_tinggal: string;
  id_ms_kota_tinggal: string;
  id_ms_kecamatan_tinggal: string;
  id_ms_desa_tinggal: string;
  alamat_tinggal: string;
  rt_tinggal: string;
  rw_tinggal: string;
  kode_pos_tinggal?: string | null;
  alamatgab_tinggal: string;
  suku?: string | null;
  nama_ibu_kandung?: string | null;
  id_ms_status_kawin?: number;
  id_ms_golongan_darah?: number;
  id_ms_agama: number;
  live?: number;
  rt_asal: string;
  rw_asal: string;
  id_ms_negara_asal: number;
  id_ms_provinsi_asal: string;
  id_ms_kota_asal: string;
  id_ms_kecamatan_asal: string;
  id_ms_desa_asal: string;
  alamat_asal: string;
  alamatgab_asal: string;
  nama_pekerjaan?: string | null;
  kode_pos_asal?: string | null;
  id_ms_pendidikan: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

export interface LatestRM {
  id_pasien: number;
  kode_rm: string;
}
