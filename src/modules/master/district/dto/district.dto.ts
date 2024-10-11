type DistrictPayloadDTO = {
  id: string;
  nama: string;
  id_kabkot: string;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { DistrictPayloadDTO };
