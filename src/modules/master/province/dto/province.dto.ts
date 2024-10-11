type ProvincePayloadDTO = {
  id: string;
  nama: string;
  id_negara: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { ProvincePayloadDTO };
