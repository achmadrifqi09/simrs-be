type ReligionPayloadDTO = {
  nama_agama: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

type ReligionDTO = {
  id_ms_agama: number;
  nama_agama: string;
  status: number;
};

type ReligionSoftDeleteDTO = {
  is_deleted: boolean;
  deleted_by: number;
  deleted_at: Date;
};

export type { ReligionPayloadDTO, ReligionDTO, ReligionSoftDeleteDTO };
