import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSION_KEY,
  PermissionMetadata,
} from '../../decorators/permission.decorator';
import { UserAccessService } from '../../modules/user-access/service/user-access.service';

@Injectable()
export class AccessMenuGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userAccessService: UserAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionMetadata = this.reflector.get<PermissionMetadata>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permissionMetadata) {
      return true;
    }

    const { tagMenu, actionType } = permissionMetadata;
    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.id;
    const levelAccessIds = request?.user?.level_access_id;

    if (!userId)
      throw new HttpException('Anda tidak memiliki izin', HttpStatus.FORBIDDEN);

    const accessUser = await this.userAccessService.findAccessPermissionByTag(
      tagMenu,
      levelAccessIds,
    );

    if (!accessUser)
      throw new HttpException(
        'Anda tidak memiliki izin untuk sumber daya terkait',
        HttpStatus.FORBIDDEN,
      );

    return !!accessUser[actionType];
  }
}
