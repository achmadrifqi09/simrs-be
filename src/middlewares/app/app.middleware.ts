import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cipher } from '../../utils/cipher';
import * as moment from 'moment-timezone';
import { generateCurrentDate } from '../../utils/date-formatter';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: any, _res: any, next: () => void) {
    const clientId: string = req.headers['client-id'];
    const clientSignature: string = req.headers['client-signature'];

    if (!clientId || !clientSignature) {
      throw new HttpException(
        'Client id atau client signature tidak ditemukan',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const client = await this.prismaService.appClient.findUnique({
      where: {
        client_id: clientId,
      },
    });

    if (!client)
      throw new HttpException('Akses tidak valid', HttpStatus.UNAUTHORIZED);

    const payload = Cipher.decryptClientKey(
      clientSignature,
      client?.client_secret,
    );

    if (!payload?.client_id || !payload?.timestamp) {
      throw new HttpException(
        'Signature tidak ditemukan',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const clientTimestamp = moment.utc(payload.timestamp);
    clientTimestamp.add(process.env.CLIENT_KEY_EXPIRED_TIME, 'minutes');
    const currentTimestamp = moment.utc(generateCurrentDate());
    if (currentTimestamp.isAfter(clientTimestamp)) {
      throw new HttpException(
        'Client signature tidak valid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
