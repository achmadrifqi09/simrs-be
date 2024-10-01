import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { LoginDTO } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment-timezone';
import * as process from 'node:process';

@Dependencies([UserService, JwtService])
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async login(credentials: LoginDTO) {
    if (!credentials?.password || !credentials.email) {
      throw new HttpException(
        'username atau password tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new HttpException(
        'Email atau password salah',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await bcrypt.compare(
      credentials.password,
      user?.password_user,
    );

    if (!result) {
      throw new HttpException(
        'Email atau password salah',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      id: user.id_user,
      email: user.email_user,
      name: user.nama_user,
    };

    const loginDate = moment.tz('Asia/Jakarta');
    const expires = loginDate.add(
      Number(process.env.JWT_TOKEN_EXPIRED_TIME || 1),
      'hours',
    );
    const formattedExpires = expires.format('YYYY-MM-DD HH:mm:ss');

    return {
      ...payload,
      token: await this.jwtService.signAsync(payload),
      expires: formattedExpires,
    };
  }

  async logout() {}
}
