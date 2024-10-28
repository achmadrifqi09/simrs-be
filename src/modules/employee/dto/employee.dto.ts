export interface Employee {
  id_pegawai: number;
  no_reg: string;
  nip_pegawai?: string | null;
  nip_pns?: string | null;
  gelar_depan?: string | null;
  gelar_belakang?: string | null;
  nama_pegawai: string;
  id_ms_negara_asal?: number | null;
  id_ms_provinsi_asal?: number | null;
  id_ms_kota_asal?: number | null;
  id_ms_kecamatan_asal?: number | null;
  id_ms_desa_asal?: number | null;
  alamat_asal?: string | null;
  kode_pos_asal?: string | null;
  rt_asal?: string | null;
  rw_asal?: string | null;
  id_ms_negara_tinggal: number;
  id_ms_provinsi_tinggal: number;
  id_ms_kota_tinggal: number;
  id_ms_kecamatan_tinggal: number;
  id_ms_desa_tinggal: number;
  alamat_tinggal: string;
  kode_pos_tinggal: string;
  rt_tinggal: string;
  rw_tinggal: string;
  tempat_lahir: string;
  tgl_lahir: Date;
  id_jenis_kelamin: number;
  id_ms_golongan_darah?: number | null;
  id_ms_status_kawin: number;
  id_ms_agama: number;
  id_ms_pendidikan: number;
  id_ms_jenis_pegawai: number;
  id_ms_status_pegawai: number;
  id_ms_spesialis?: number | null;
  id_unit_induk: number;
  id_pangkat: number;
  id_jabatan: number;
  id_unit_jabatan: number;
  id_gaji?: number | null;
  pjs?: number | null;
  hp: string;
  email: string;
  no_npwp: string;
  no_ktp: string;
  foto?: string | null;
  kode_arsip?: string | null;
  id_finger: string;
  kode_dpjp?: string | null;
  tgl_masuk: Date;
  tgl_keluar?: Date | null;
  status_pns: number;
  status_aktif: number;
  id_pelamar?: number | null;
  created_at: Date;
  created_by: number;
  modified_at?: Date | null;
  modified_by?: number | null;
  deleted_at?: Date | null;
  deleted_by?: number | null;
  restored_at?: Date | null;
  restored_by?: number | null;
  is_deleted: boolean;
  is_restored: boolean;
}