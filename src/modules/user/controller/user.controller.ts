import { Controller, Dependencies, Get, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Dependencies([UserService])
@Controller({
  path: '/user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find')
  async findUser(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
