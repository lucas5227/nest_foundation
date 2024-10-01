FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

#CMD ["yarn", "start:prod"]
CMD ["yarn", "start:dev"]
