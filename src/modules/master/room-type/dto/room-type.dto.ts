export interface RoomTypePayloadDTO {
  nama_jenis_kamar: string;
  id_kelas_kamar: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}
