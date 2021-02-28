import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Role } from './schemas/Role';
import { Post } from './schemas/Post';
import { Tag } from './schemas/Tag';
import { Reaction } from './schemas/Reaction';
import { Comment } from './schemas/Comment';
import { Reply } from './schemas/Reply';
import { PostImage } from './schemas/PostImage';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './mail';
import { permissionsList } from './schemas/fields';
import { databaseURL, sessionConfig } from './config';
import { extendGraphqlSchema } from './mutations';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      port: process.env.PORT || 3000,
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
      async onConnect(keystone) {
        console.log('✨ Connected to the Database');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      Comment,
      Post,
      PostImage,
      Reaction,
      Reply,
      Role,
      Tag,
      User,
    }),
    extendGraphqlSchema,
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }): boolean => session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: `
      id
      name
      email
      role {
        ${permissionsList.join(' ')}
      }
    `,
    }),
  })
);
