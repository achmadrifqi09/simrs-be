import { Controller, Get, Header, Req } from '@nestjs/common';
import { MenuService } from '../service/menu.service';

@Controller('/api/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/user')
  @Header('Content-Type', 'application/json')
  async findMenuByUserId(@Req() req: any) {
    return this.menuService.findMenuByUserId(req);
  }
}
