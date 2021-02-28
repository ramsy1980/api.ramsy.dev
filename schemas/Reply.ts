import { relationship, timestamp, mongoId } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules } from '../access';

export const Reply = list({
  access: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    create: rules.canManageComments,
    read: () => true,
    update: rules.canManageComments,
    delete: rules.canManageComments,
  },
  ui: {
    hideCreate: (args) => !rules.canManageComments(args),
    hideDelete: (args) => !rules.canManageComments(args),
    isHidden: (args) => !rules.canManageComments(args),
  },
  fields: {
    comment: relationship({
      ref: 'Comment.replies',
    }),
    replyTo: mongoId({ defaultValue: null }),
    user: relationship({
      ref: 'User.replies',
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
