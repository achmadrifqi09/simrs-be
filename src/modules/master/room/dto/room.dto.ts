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

type RawRoomResult = {
  id: number;
  id_ms_kamar_jenis: number;
  id_gedung: number;
  lantai: number;
  nama_kamar: string;
  status: number;
  created_at: Date;
  created_by: number;
  modified_at: Date | null;
  modified_by: number | null;
  deleted_at: Date | null;
  deleted_by: number | null;
  restored_at: Date | null;
  restored_by: number | null;
  is_deleted: boolean;
  is_restored: boolean;
  jenis_kamar_id: number;
  nama_jenis_kamar: string;
  gedung_id: number;
  nama_gedung: string;
  bedroom_count: bigint;
};

export type { RawRoomResult, RoomPayloadDTO };
