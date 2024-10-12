import { Dependencies, Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repository/permission.repository';

@Dependencies([PermissionRepository])
@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findUserMenuPermission(id: number, tag: string){
    return this.permissionRepository.findPermissionByUserIdAndTag(id, tag);
  }
}
