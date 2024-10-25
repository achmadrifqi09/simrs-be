import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers?.authorization;
    if (!token) {
      throw new WsException('Aksi tidak tidak valid (invalid token access)');
    }
    try {
      this.jwtService.verify(token?.split(' ')[1]);
      return true;
    } catch {
      throw new WsException('Aksi tidak tidak valid (invalid token access)');
    }
  }
}
