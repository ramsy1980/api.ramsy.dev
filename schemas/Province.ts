import { list } from '@keystone-next/keystone/schema';
import { text, relationship } from '@keystone-next/fields';
import { permissions } from '../access';

export const Province = list({
  access: {
    create: permissions.canManageProvinces,
    read: permissions.canManageProvinces,
    update: permissions.canManageProvinces,
    delete: permissions.canManageProvinces,
  },
  ui: {
    listView: {
      initialColumns: ['name', 'safetyRegions'],
    },
  },
  fields: {
    name: text(),
    safetyRegions: relationship({
      ref: 'SafetyRegion.province',
      many: true,
      access: {
        create: permissions.canManageSafetyRegions,
        update: permissions.canManageSafetyRegions,
      },
      ui: {
        createView: {
          fieldMode: (props) =>
            permissions.canManageProvinces(props) ? 'edit' : 'hidden',
        },
        itemView: {
          fieldMode: (props) =>
            permissions.canManageProvinces(props) ? 'edit' : 'read',
        },
      },
    }),
  },
});
