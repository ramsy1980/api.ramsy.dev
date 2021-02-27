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
  canManageCapCodes: checkbox({
    defaultValue: false,
    label: 'User can see and manage CAP codes',
  }),
  canManageProvinces: checkbox({
    defaultValue: false,
    label: 'User can see and manage provinces',
  }),
  canManageSafetyRegions: checkbox({
    defaultValue: false,
    label: 'User can see and manage safety regions',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
