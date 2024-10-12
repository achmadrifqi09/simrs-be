import { Dependencies, Injectable } from '@nestjs/common';
import { MenuRepository } from '../repository/menu.repository';

@Dependencies([MenuRepository])
@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  private buildMenuTree(menus: any[], parentId: number | null = null): any[] {
    return menus
      .filter((menu) => menu.parent_id === parentId)
      .map((menu) => ({
        ...menu,
        children: this.buildMenuTree(menus, menu.id),
      }));
  }

  async findMenuByUserId(userId: number) {
    const menus = await this.menuRepository.getMenuByUserId(userId);
    const formattedMenus = menus.map((menu) => ({
      id: menu.id,
      parent_id: menu.parent_id,
      order: menu.order,
      label: menu.label,
      icon: menu.icon,
      pathname: menu.pathname,
      is_submenu: menu.is_submenu,
      can_create: menu.menu_permission[0]?.can_create ?? false,
      can_update: menu.menu_permission[0]?.can_update ?? false,
      can_delete: menu.menu_permission[0]?.can_delete ?? false,
      children: [],
    }));

    return this.buildMenuTree(formattedMenus);
  }
}
