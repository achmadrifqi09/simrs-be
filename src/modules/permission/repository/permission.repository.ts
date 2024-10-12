import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findPermissionByUserIdAndTag(userId: number, tag: string) {
    return this.prismaService.menuPermission.findFirst({
      where: {
        id_user: userId,
        tag: tag,
      },
    });
  }
}
