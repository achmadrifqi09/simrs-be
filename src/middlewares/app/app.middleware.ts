import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cipher } from '../../utils/cipher';
import * as moment from 'moment-timezone';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: any, _res: any, next: () => void) {
    const clientKey: string = req.headers['client-key'];
    const payload = Cipher.decryptClientKey(clientKey);

    if (!payload?.client_id || !payload?.timestamp) {
      throw new HttpException(
        'Client key tidak ditemukan',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const clientTimestamp = moment.tz(payload.timestamp, 'Asia/Jakarta');
    clientTimestamp.add(process.env.CLIENT_KEY_EXPIRED_TIME, 'minutes');
    const currentDate = moment.tz('Asia/Jakarta');

    if (currentDate.isAfter(clientTimestamp)) {
      throw new HttpException(
        'Client key tidak valid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const clientExists = await this.prismaService.appClient.findUnique({
      where: {
        client_id: payload?.client_id,
      },
    });

    if (!clientExists) {
      throw new HttpException(
        'Client key tidak valid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
