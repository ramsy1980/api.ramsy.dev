import { relationship, select, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules } from '../access';

export const Reaction = list({
  access: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    create: rules.canManageReactions,
    read: () => true,
    update: rules.canManageReactions,
    delete: rules.canManageReactions,
  },
  ui: {
    listView: {
      initialColumns: ['posts', 'mood', 'user', 'createdAt'],
    },
    hideCreate: (args) => !rules.canManageReactions(args),
    hideDelete: (args) => !rules.canManageReactions(args),
    isHidden: (args) => !rules.canManageReactions(args),
  },
  fields: {
    mood: select({
      isRequired: true,
      options: [
        { label: '❤️', value: '❤️' },
        { label: '👍', value: '👍' },
      ],
      defaultValue: '❤️',
      ui: {
        displayMode: 'segmented-control',
        // createView: { fieldMode: 'hidden' },
        // itemView: { fieldMode: 'hidden' },
      },
    }),
    posts: relationship({
      ref: 'Post.reactions',
    }),
    user: relationship({
      ref: 'User.reactions',
      defaultValue: ({ context }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        connect: { id: context.session.itemId },
      }),
      access: { create: false, read: true, update: false },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
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
