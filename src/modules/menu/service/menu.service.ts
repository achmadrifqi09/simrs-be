import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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

  async findMenuByUserId(req: any) {
    const levelAccessIds = req.user.level_access_id;
    if (!levelAccessIds) {
      throw new HttpException(
        'Anda tidak memiliki izin menu',
        HttpStatus.BAD_REQUEST,
      );
    }
    const menus =
      await this.menuRepository.findMenuByLevelAccess(levelAccessIds);
    const formattedMenus = menus.map((menu) => ({
      id: menu.menu.id,
      parent_id: menu.menu.parent_id,
      order: menu.menu.order,
      label: menu.menu.label,
      icon: menu.menu.icon,
      pathname: menu.menu.pathname,
      is_submenu: menu.menu.is_submenu,
      children: [],
    }));

    return this.buildMenuTree(formattedMenus);
  }
}
