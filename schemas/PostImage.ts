import { list } from '@keystone-next/keystone/schema';
import { relationship, text } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { rules } from '../access';
import { cloudinary } from '../config';

export const PostImage = list({
  access: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    post: relationship({ ref: 'Post.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'post'],
    },
  },
});
