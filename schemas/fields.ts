import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManagePosts: checkbox({
    defaultValue: false,
    label: 'User can manage posts',
  }),
  canManageTags: checkbox({
    defaultValue: false,
    label: 'User can manage tags',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
