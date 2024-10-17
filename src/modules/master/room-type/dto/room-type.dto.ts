type RoomTypePayloadDTO = {
  nama_jenis_kamar: string;
  id_kamar_kelas: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { RoomTypePayloadDTO };
