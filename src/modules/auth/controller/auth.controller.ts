import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { Login } from '../type/auth.type';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async login(@Body() credentials: Login) {
    return await this.authService.login(credentials);
  }

  @Post('/verify-token')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async verifyToken(@Body() data: { token: string }) {
    return this.authService.verifyToken(data.token);
  }
}
