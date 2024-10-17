type BedPayloadDTO = {
  id_ms_kamar: number;
  nama_bed: string;
  keterangan: string;
  status_bed: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { BedPayloadDTO };
