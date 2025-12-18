# Build stage:
FROM node:24-alpine AS builder

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Runtime stage
FROM node:24-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]