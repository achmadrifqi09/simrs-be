export interface BloodTypePayloadDTO {
  nama_golongan_darah: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}

export interface BloodTypeDTO {
  id_ms_golongan_darah: number;
  nama_golongan_darah: string;
  status: number;
}

export interface BloodTypeUpdateStatusDTO {
  status: number;
  modified_at?: Date;
  modified_by?: number;
}
