FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN npm install typescript @types/node --save-dev

COPY api/ ./api/

WORKDIR /app/api

RUN npx tsc -p tsconfig.json

WORKDIR /app

RUN ls -la dist/

EXPOSE 3001

ENV NODE_ENV=production
ENV JWT_SECRET=your-secure-jwt-secret-change-in-production

CMD ["node", "--trace-uncaught", "dist/index.js"]