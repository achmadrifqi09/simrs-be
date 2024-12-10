export interface RegistrationDto {
  nomor_registrasi: string;
  id_online?: number;
  kode_rm: string | null;
  tgl_daftar: Date;
  id_asuransi?: number;
  nomor_asuransi?: string;
  no_rujukan?: string;
  status_rujukan?: number;
  nomor_rujuk_balik?: string;
  no_sep?: string;
  cob?: number;
  no_cob?: string;
  status_bpjs: number;
  status_keuangan: number;
  status_inap: number;
  status_koding: number;
  status_bayar: number;
  tgl_pulang?: Date;
  nama_wali?: string;
  telp_wali?: string;
  id_hub_wali?: number;
  asal_rujukan?: string;
  nama_perujuk?: string;
  tgl_rujukan?: Date;
  ket_rujukan?: string;
  kode_antrian_poli?: string;
  nomor_antrian_poli?: number;
  status_batal: number;
  keterangan_batal?: string;
  task_id?: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

export interface RegistrationUpdateDto {
  cob?: number | null;
  no_cob?: string | null;
  nama_wali: string;
  telp_wali: string;
  id_hub_wali?: number | null;
  asal_rujukan?: string | null;
  nama_perujuk?: string | null;
  status_bpjs: number;
  status_inap: number;
  no_rujukan?: string;
  ket_rujukan?: string | null;
  status_rujukan?: number | null;
  nomor_rujuk_balik?: string | null;
  tgl_rujukan?: Date | null;
  id_asuransi?: number | null;
  nomor_asuransi?: string | null;
  modified_at?: Date;
  modified_by?: number;
  kode_antrian_poli?: string;
  nomor_antrian_poli?: number;
}

export interface CancellationStatusPayload {
  status_batal: number;
  keterangan_batal: string;
  task_id_terakhir?: number;
  modified_at?: Date;
  modified_by?: number;
}
