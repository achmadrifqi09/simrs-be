import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findClient(id: string) {
    return this.prismaService.appClient.findFirst({
      where: {
        client_id: id,
      },
    });
  }
}
