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
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repository/auth.repository';
import { generateExpiresDate } from '../../../utils/date-formatter';

@Dependencies([UserService, JwtService, AuthRepository])
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  @Post()
  async login(credentials: LoginDTO) {
    if (!credentials?.password || !credentials.email) {
      throw new HttpException(
        'username atau password tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findByEmail(credentials.email);
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

    return {
      ...payload,
      token: await this.jwtService.signAsync(payload),
      expires: generateExpiresDate(),
      permissions: user.izin_user,
    };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Token tidak valid', HttpStatus.UNAUTHORIZED);
    }
  }

  async findClient(id: string) {
    return this.authRepository.findClient(id);
  }
}
