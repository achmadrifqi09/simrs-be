type SoftDeleteDTO = {
  is_deleted: boolean;
  deleted_by: number;
  deleted_at: Date;
};

type StatusUpdateDTO = {
  status: number;
  modified_at?: Date;
  modified_by?: number;
};

export type { SoftDeleteDTO, StatusUpdateDTO };
