import { relationship, select, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules } from '../access';

export const Post = list({
  access: {
    create: rules.canManagePosts,
    read: rules.canReadPosts,
    update: rules.canManagePosts,
    delete: rules.canManagePosts,
  },
  ui: {
    hideCreate: (args) => !rules.canManagePosts(args),
    hideDelete: (args) => !rules.canManagePosts(args),
    isHidden: (args) => !rules.canManagePosts(args),
  },
  fields: {
    title: text({ isRequired: true }),
    body: text({ isRequired: true }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Published', value: 'PUBLISHED' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    user: relationship({
      ref: 'User.posts',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      access: { create: false, read: true, update: false },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
    }),
    createdAt: timestamp({
      access: { create: false, read: true, update: false },
      defaultValue: () => new Date().toISOString(),
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    updatedAt: timestamp({
      access: { create: false, read: true, update: false },
      hooks: {
        resolveInput: () => new Date().toISOString(),
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
