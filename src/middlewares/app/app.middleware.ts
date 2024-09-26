import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {
  }

  async use(req: any, res: any, next: () => void) {
    const clientId: string = req.headers['client-id'];
    if (!clientId) {
      throw new HttpException(
        {
          client_id: ['client id di perlukan'],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const clientExists = await this.prismaService.appClient.findUnique({
      where: {
        client_id: clientId,
      },
    });

    if (!clientExists) {
      throw new HttpException('client id tidak valid', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
