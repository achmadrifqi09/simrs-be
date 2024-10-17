type RoomPayloadDTO = {
  id_ms_kamar_jenis: number;
  id_gedung: number;
  lantai: number;
  nama_kamar: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { RoomPayloadDTO };
