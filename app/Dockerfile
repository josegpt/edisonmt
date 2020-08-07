FROM node:14.7.0-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm","start"]
