type VillagePayloadDTO = {
  id: string;
  nama: string;
  id_kecamatan: string;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { VillagePayloadDTO };
