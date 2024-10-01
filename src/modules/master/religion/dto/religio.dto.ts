type ReligionPayloadDTO = {
  nama_agama: string;
  status: number;
  created_by?: number;
};

type ReligionDTO = {
  id_ms_agama: number;
  nama_agama: string;
  status: number;
};

export type { ReligionPayloadDTO, ReligionDTO };
