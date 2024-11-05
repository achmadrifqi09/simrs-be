import { Controller, Get, Header, HttpCode, Req } from '@nestjs/common';
import { UserAccessService } from '../service/user-access.service';

@Controller({
  path: '/user-access',
  version: '1',
})
export class UserAccessController {
  constructor(private readonly userAccessService: UserAccessService) {}

  @Get('/permission')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async findUserPermission(@Req() req: any) {
    return await this.userAccessService.findManyUserAccess(req.user.id);
  }
}
