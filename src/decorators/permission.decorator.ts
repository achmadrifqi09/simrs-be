import { SetMetadata } from '@nestjs/common';
import { Action } from '../common/enums/action.enum';

export const PERMISSION_KEY = 'permission';

export interface PermissionMetadata {
  tagMenu: string;
  actionType: Action;
}

export const Permission = (tagMenu: string, actionType: Action) =>
  SetMetadata<string, PermissionMetadata>(PERMISSION_KEY, {
    tagMenu,
    actionType,
  });
