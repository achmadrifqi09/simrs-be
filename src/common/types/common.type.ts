type SoftDelete = {
  is_deleted: boolean;
  deleted_by: number;
  deleted_at: Date;
};

type UpdateStatus = {
  status: number;
  modified_at?: Date;
  modified_by?: number;
};

type UpdateStatusEmployee = {
  status_aktif: number;
  modified_at?: Date;
  modified_by?: number;
};

type BedAvailability = {
  status_bed: number;
  modified_at?: Date;
  modified_by?: number;
};

export type { SoftDelete, UpdateStatus, BedAvailability, UpdateStatusEmployee };
