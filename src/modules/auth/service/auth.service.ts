import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { Login } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repository/auth.repository';
import { generateExpiresDate } from '../../../utils/date-formatter';
import { UserAccessService } from '../../user-access/service/user-access.service';

@Dependencies([UserService, JwtService, AuthRepository, UserAccessService])
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly userAccessService: UserAccessService,
  ) {}

  @Post()
  async login(credentials: Login) {
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

    const userAccess = await this.userAccessService.findManyUserAccess(
      user.id_user,
    );
    const levelAccessIds = userAccess.map((access) => access.id_level_akses);

    const payload = {
      id: user.id_user,
      email: user.email_user,
      name: user.nama_user,
      level_access_id: levelAccessIds,
    };

    return {
      id: user.id_user,
      email: user.email_user,
      name: user.nama_user,
      token: await this.jwtService.signAsync(payload),
      expires: generateExpiresDate(),
    };
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new HttpException('Token tidak valid', HttpStatus.UNAUTHORIZED);
    }
  }

  async findClient(id: string) {
    return this.authRepository.findClient(id);
  }
}
