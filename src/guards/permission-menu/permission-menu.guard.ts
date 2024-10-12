import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionService } from '../../modules/permission/service/permission.service';
import {
  PERMISSION_KEY,
  PermissionMetadata,
} from '../../decorators/permission.decorator';

@Injectable()
export class PermissionMenuGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionMetadata = this.reflector.get<PermissionMetadata>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permissionMetadata) {
      return true; // No metadata, allow access
    }

    const { tagMenu, actionType } = permissionMetadata;
    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.id;

    if (!userId)
      throw new HttpException('Anda tidak memiliki izin', HttpStatus.FORBIDDEN);

    const permission = await this.permissionService.findUserMenuPermission(
      userId,
      tagMenu,
    );

    if (!permission)
      throw new HttpException('Anda tidak memiliki izin', HttpStatus.FORBIDDEN);

    return !!permission[actionType];
  }
}
