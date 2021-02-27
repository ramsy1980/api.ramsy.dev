import { list } from '@keystone-next/keystone/schema';
import { text } from '@keystone-next/fields';
import { permissions } from '../access';

export const CapCode = list({
  access: {
    create: permissions.canManageCapCodes,
    read: permissions.canManageCapCodes,
    update: permissions.canManageCapCodes,
    delete: permissions.canManageCapCodes,
  },
  ui: {
    listView: {
      initialColumns: [
        'code',
        'discipline',
        'region',
        'place',
        'description',
        'short',
      ],
    },
  },
  fields: {
    code: text({isRequired: true, isUnique: true, isIndexed: true}),
    discipline: text(),
    region: text(),
    place: text(),
    description: text(),
    short: text(),
  },
});
