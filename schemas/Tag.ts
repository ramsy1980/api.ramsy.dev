import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions } from '../access';

export const Tag = list({
  access: {
    create: permissions.canManageTags,
    read: () => true,
    update: permissions.canManageTags,
    delete: permissions.canManageTags,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageTags(args),
    hideDelete: (args) => !permissions.canManageTags(args),
    isHidden: (args) => !permissions.canManageTags(args),
  },
  fields: {
    name: text({ isRequired: true }),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
    }),
  },
});
