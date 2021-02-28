export const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'cloudName',
  apiKey: process.env.CLOUDINARY_KEY || 'apiKey',
  apiSecret: process.env.CLOUDINARY_SECRET || 'apiSecret',
  folder: process.env.CLOUDINARY_FOLDER || 'api-ramsy-dev',
};

export const sessionConfig = {
  secret: process.env.COOKIE_SECRET || 'secret_not_set',
  secure: process.env.NODE_ENV === 'production', // Defaults to true in production
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  sameSite: false,
};
