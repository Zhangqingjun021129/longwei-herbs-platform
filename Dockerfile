FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build:server

RUN ls -la dist/

RUN ls -la dist/config/

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001
ENV JWT_SECRET=your-secure-jwt-secret-change-in-production

CMD ["node", "--trace-uncaught", "dist/index.js"]