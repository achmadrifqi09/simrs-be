type RoomClassPayloadDTO = {
  nama_kelas_kamar: string;
  kode_bpjs_kamar: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { RoomClassPayloadDTO };
