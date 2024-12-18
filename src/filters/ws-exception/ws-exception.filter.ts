import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const message =
      exception?.getError() || 'Terjadi kesalahan yang tidak terduga';

    client.emit(`error-${client.id}`, {
      error: message,
      clientId: client.id,
    });
  }
}
