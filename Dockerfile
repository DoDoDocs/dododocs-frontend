FROM krmp-d2hub-idock.9rum.cc/goorm/node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]