type Access = {
  id: number;
  nama: string;
};

type AccessPermission = {
  id: number;
  id_menu: number;
  id_level_akses: number;
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
};

type UserAccess = {
  id_user: number;
  id_level_akses: number;
  id_pegawai: number;
};

export type { Access, AccessPermission, UserAccess };
