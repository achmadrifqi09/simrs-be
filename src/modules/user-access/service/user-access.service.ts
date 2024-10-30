import { Dependencies, Injectable } from '@nestjs/common';
import { UserAccessRepository } from '../repository/user-access.repository';

@Dependencies([UserAccessRepository])
@Injectable()
export class UserAccessService {
  constructor(private readonly userAccessRepository: UserAccessRepository) {}

  async findLevelUserByUserId(userId: number) {
    return this.userAccessRepository.findLevelUserByUserId(userId);
  }

  async findManyUserAccess(userId: number) {
    const access_permission =
      await this.userAccessRepository.findManyUserAccessByUserId(userId);
    return access_permission.flatMap((access) =>
      access.level_akses.izin_level_akses.map((permission) => ({
        id: permission.id,
        id_level_akses: permission.id_level_akses,
        can_view: permission.can_view,
        can_delete: permission.can_delete,
        can_create: permission.can_create,
        can_update: permission.can_update,
        menu: {
          pathname: permission.menu.pathname,
          tag: permission.menu.tag,
        },
      })),
    );
  }

  async findAccessPermissionByTag(menuTag: string, levelAccessIds: number[]) {
    return this.userAccessRepository.findUserAccessPerTag(
      menuTag,
      levelAccessIds,
    );
  }
}
