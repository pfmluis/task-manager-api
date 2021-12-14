FROM node:14.16.1

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .docker.env .env
COPY .babelrc .

RUN npm ci

COPY ./src src

RUN npm run docker:build

COPY ./migrations migrations
COPY ./seeds seeds
COPY ./knexfile.js .

CMD npm run docker:start
