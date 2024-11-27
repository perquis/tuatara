FROM node:20-alpine3.20 as deps

WORKDIR /app

COPY package.json .

RUN npm install

FROM node:20-alpine3.20

WORKDIR /backend

COPY --from=deps /app/node_modules /backend/node_modules

COPY . .

RUN npm run build

CMD ["npm", "start"]
