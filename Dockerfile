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

RUN apk add --no-cache netcat-openbsd

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/app/dist ./dist

# Check on Mongo Service
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 3000

CMD [ "node", "dist/main.js" ]