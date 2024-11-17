import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public/public.decorator';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const client = context.switchToWs().getClient();
    const token = this.extractTokenFromHeader(client);

    if (!token) {
      throw new WsException('Aksi tidak tidak valid (invalid token access)');
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return true;
    } catch {
      throw new WsException('Aksi tidak tidak valid (invalid token access)');
    }
  }

  private extractTokenFromHeader(client: Socket) {
    const [type, token] =
      client.handshake.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
