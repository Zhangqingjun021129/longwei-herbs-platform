FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:client

RUN npm run build:server

CMD ["node", "dist/server/index.js"]
