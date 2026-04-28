FROM node:25.9-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN DATABASE_URL="postgresql://postgres:name@localhost:5432/dummy" npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/main.js"]