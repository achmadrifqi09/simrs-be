type Menu = {
  id?: number;
  label: string;
  order: number;
  icon?: string;
  pathname?: string;
  status: boolean;
  is_submenu: boolean;
  submenus?: Submenu[];
};

type Submenu = {
  id?: number;
  label: string;
  pathname: string;
};

type MenuPermission = {
  id: number;
  nama: string;
  can_create: boolean;
  can_delete: boolean;
  can_update: boolean;
  can_view: boolean;
  submenus?: SubmenuPermission[];
};

type SubmenuPermission = {
  id: number;
  id_izin_menu: number;
  id_submenu: number;
  can_create: boolean;
  can_delete: boolean;
  can_update: boolean;
  can_view: boolean;
};

export type { Menu, Submenu, MenuPermission };
