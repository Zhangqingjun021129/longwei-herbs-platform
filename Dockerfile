FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY api/ ./api/

RUN npx tsc -p api/tsconfig.json

CMD ["node", "dist/server/index.js"]
