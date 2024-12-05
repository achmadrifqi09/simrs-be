export interface Employee {
  no_reg: string;
  nip_pegawai: string;
  nip_pns?: string | null;
  gelar_depan?: string | null;
  gelar_belakang?: string | null;
  nama_pegawai: string;
  id_ms_negara_asal?: number | null;
  id_ms_provinsi_asal?: string | null;
  id_ms_kota_asal?: string | null;
  id_ms_kecamatan_asal?: string | null;
  id_ms_desa_asal?: string | null;
  alamat_asal?: string | null;
  kode_pos_asal?: string | null;
  rt_asal?: string | null;
  rw_asal?: string | null;
  id_ms_negara_tinggal: number;
  id_ms_provinsi_tinggal: string;
  id_ms_kota_tinggal: string;
  id_ms_kecamatan_tinggal: string;
  id_ms_desa_tinggal: string;
  alamat_tinggal: string;
  kode_pos_tinggal: string;
  rt_tinggal: string;
  rw_tinggal: string;
  tempat_lahir: string;
  tgl_lahir: Date;
  id_jenis_kelamin: number; // 1: laki-laki 2:perempuan
  id_ms_golongan_darah: number;
  id_ms_status_kawin: number;
  id_ms_agama: number;
  id_ms_pendidikan?: number | null; // optional
  id_ms_jenis_pegawai?: number | null; // optional
  id_ms_status_pegawai?: number | null; // optional
  id_ms_spesialis?: number | null; // optional
  id_unit_induk?: number | null; // optional
  id_pangkat?: number | null; // optional
  id_jabatan?: number | null; // optional
  id_unit_jabatan?: number | null; // optional
  id_gaji?: number | null; // optional
  hp: string;
  email: string;
  no_npwp?: string | null;
  no_ktp: string;
  no_ktam?: string | null;
  kode_arsip?: string | null;
  id_finger?: string | null;
  kode_dpjp?: string | null;
  tgl_masuk?: Date | null; // optional
  tgl_keluar?: Date | null; // optional
  status_pns?: number; // 0: non pns, 1: pns
  status_aktif?: number; // 0: nonaktif, 1: aktif
  id_pelamar?: number | null;
  foto?: string | null;
  file_ktp?: string | null;
  file_kk?: string | null;
  file_ktam?: string | null;
  file_npwp?: string | null;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

export interface UpdateCodeDpjp {
  kode_dpjp: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}

export interface UpdateFileFoto {
  foto: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}

export interface UpdateFileKtp {
  file_ktp: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}

export interface UpdateFileKk {
  file_kk: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}

export interface UpdateFileKtam {
  file_ktam: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}

export interface UpdateFileNpwp {
  file_npwp: string;
  // created_by?: number;
  // created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  // deleted_at?: Date;
}
