import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { LoginDTO } from '../dto/auth.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async login(@Body() credentials: LoginDTO) {
    return await this.authService.login(credentials);
  }

  @Post('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async logout() {
    return await this.authService.logout();
  }
}
