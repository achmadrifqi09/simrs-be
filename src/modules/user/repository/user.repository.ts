import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Dependencies([PrismaService])
@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email_user: email },
      select: {
        id_user: true,
        nama_user: true,
        email_user: true,
        password_user: true,
        status: true,
        // izin_user: {
        //   select: {
        //     izin_menu: {
        //       select: {
        //         nama: true,
        //         id_menu: true,
        //         can_view: true,
        //         can_create: true,
        //         can_update: true,
        //         can_delete: true,
        //         submenu: {
        //           select: {
        //             id_submenu: true,
        //             can_view: true,
        //             can_create: true,
        //             can_update: true,
        //             can_delete: true,
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
      },
    });
  }
}
