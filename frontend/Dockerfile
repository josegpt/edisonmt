FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN "npm run-script build"

EXPOSE 3000

CMD ["npm","start"]
