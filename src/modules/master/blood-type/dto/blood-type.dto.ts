type BloodTypePayloadDTO = {
  nama_golongan_darah: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

type BloodTypeDTO = {
  id_ms_golongan_darah: number;
  nama_golongan_darah: string;
  status: number;
};

type BloodTypeUpdateStatusDTO = {
  status: number;
  modified_at?: Date;
  modified_by?: number;
};

export type { BloodTypePayloadDTO, BloodTypeDTO, BloodTypeUpdateStatusDTO };
