import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { Public } from '../../../decorators/public/public.decorator';
import { AuthService } from '../service/auth.service';
import { Login } from '../dto/auth.dto';
import { Throttle } from '@nestjs/throttler';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
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
