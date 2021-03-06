import { list } from '@keystone-next/keystone/schema';
<<<<<<< HEAD
import { text, password, relationship } from '@keystone-next/fields';
=======
import { text, password, relationship, timestamp } from '@keystone-next/fields';
>>>>>>> develop
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => false,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // Only people with the permission can delete themselves.
    // You can delete yourself
    delete: permissions.canManageUsers,
  },
  ui: {
    listView: {
      initialColumns: ['email', 'name', 'password', 'role'],
    },
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
      ui: {
        createView: {
          fieldMode: (props) =>
            permissions.canManageUsers(props) ? 'edit' : 'hidden',
        },
        itemView: {
          fieldMode: (props) =>
            permissions.canManageUsers(props) ? 'edit' : 'read',
        },
      },
    }),
    posts: relationship({
      ref: 'Post.user',
      many: true,
    }),
    reactions: relationship({
      ref: 'Reaction.user',
      many: true,
    }),
    comments: relationship({
      ref: 'Comment.user',
      many: true,
    }),
    replies: relationship({
      ref: 'Reply.user',
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
