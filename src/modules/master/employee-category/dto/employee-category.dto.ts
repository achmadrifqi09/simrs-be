export interface TypeOfStatusOfficerPayloadDTO {
  status_jenis_pegawai: string;
  kode_nip: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}
