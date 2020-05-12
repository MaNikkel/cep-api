# * FOR DEV USE

FROM node:12.16-alpine3.11

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD [ "yarn", "start" ]