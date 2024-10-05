import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../service/menu.service';

@Controller('/api/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll() {
    return this.menuService.findAll();
  }
}
