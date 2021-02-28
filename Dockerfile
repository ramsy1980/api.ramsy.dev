ARG NODE_VERSION=14.15.4

# Build container
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

RUN apk add --no-cache yarn vips-dev python3 build-base
ADD . /app
RUN yarn install --production && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 4000
CMD ["yarn", "start"]
