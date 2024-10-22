type WorkUnit = {
  nama_unit_kerja: string;
  jenis_pelayanan: number;
  kode_instalasi_bpjs?: string;
  status_antrian: number;
  id_unit_induk?: number;
  is_parent_unit: number;
  id_bidang?: number;
  status: number;
  created_by?: number;
  created_at?: Date;
  modified_at?: Date;
  modified_by?: number;
  deleted_at?: Date;
};

type WorkUnitUpdateQueueStatus = {
  status_antrian: number;
  modified_at?: Date;
  modified_by?: number;
};

export type { WorkUnit, WorkUnitUpdateQueueStatus };