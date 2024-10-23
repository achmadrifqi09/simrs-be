import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthRepository } from './repository/auth.repository';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    UserAccessModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: `${process.env.JWT_TOKEN_EXPIRED_TIME}h` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
