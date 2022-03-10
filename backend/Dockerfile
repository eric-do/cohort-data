FROM node:14 AS base

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [" node", "server/index.ts"]

FROM base AS production

ENV NODE_PATH=./build

RUN npm run build