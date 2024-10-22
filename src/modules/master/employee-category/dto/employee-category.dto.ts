type TypeOfStatusOfficerPayloadDTO = {
  status_jenis_pegawai: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

export type { TypeOfStatusOfficerPayloadDTO };
