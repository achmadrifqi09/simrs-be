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
  is_create: boolean;
  is_delete: boolean;
  is_update: boolean;
  is_view: boolean;
  submenus?: SubmenuPermission[];
};

type SubmenuPermission = {
  id: number;
  id_izin_menu: number;
  id_submenu: number;
  is_create: boolean;
  is_delete: boolean;
  is_update: boolean;
  is_view: boolean;
};

export type { Menu, Submenu, MenuPermission };
