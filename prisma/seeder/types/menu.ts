type Menu = {
  id?: number;
  parent_id?: number;
  order?: number;
  label: string;
  pathname?: string;
  is_submenu: boolean;
  status: boolean;
  tag: string;
};

export type { Menu };
