import { Controller, Get, Header, Param } from '@nestjs/common';
import { MenuService } from '../service/menu.service';

@Controller('/api/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('user/:id')
  @Header('Content-Type', 'application/json')
  async findMenuByUserId(@Param('id') id: number) {
    return this.menuService.findMenuByUserId(Number(id));
  }
}
