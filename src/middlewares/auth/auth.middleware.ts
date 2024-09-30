import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('Token tidak ditemukan', HttpStatus.UNAUTHORIZED);
    }

    try {
      req.user = await this.jwtService.verifyAsync(token);
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Token tidak valid', HttpStatus.UNAUTHORIZED);
    }
  }
}
