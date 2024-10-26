export interface FamilyStatusPayloadDTO {
  nama_status_keluarga: string;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
}
