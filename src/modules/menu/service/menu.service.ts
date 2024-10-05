import { Dependencies, Injectable } from '@nestjs/common';
import { MenuRepository } from '../repository/menu.repository';

@Dependencies([MenuRepository])
@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findAll() {
    const userMenus = await this.menuRepository.findAll();

    const formattedMenus = userMenus.map((permission) => ({
      ...permission.izin_menu.menu,
      submenu: permission.izin_menu.menu.submenu.map((sub) => ({
        ...sub,
        id_menu: permission.izin_menu.menu.id,
      })),
    }));

    formattedMenus.sort((a, b) => a.order - b.order);
    return formattedMenus;
  }
}
