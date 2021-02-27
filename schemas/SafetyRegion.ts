import { list } from '@keystone-next/keystone/schema';
import { text, integer, relationship } from '@keystone-next/fields';
import { permissions } from '../access';

export const SafetyRegion = list({
  access: {
    create: permissions.canManageSafetyRegions,
    read: permissions.canManageSafetyRegions,
    update: permissions.canManageSafetyRegions,
    delete: permissions.canManageSafetyRegions,
  },
  ui: {
    listView: {
      initialColumns: [
        'no', 'name', 'province'
      ],
    },
  },
  fields: {
    no: integer({ isRequired: true, isUnique: true, isIndexed: true}),
    name: text({isRequired: true}),
    province: relationship({
      ref: 'Province.safetyRegions',
      access: {
        create: permissions.canManageSafetyRegions,
        update: permissions.canManageSafetyRegions,
      },
      ui: {
        createView: {
          fieldMode: (props) =>
            permissions.canManageSafetyRegions(props) ? 'edit' : 'hidden',
        },
        itemView: {
          fieldMode: (props) =>
            permissions.canManageSafetyRegions(props) ? 'edit' : 'read',
        },
      },
    }),
  },
});
