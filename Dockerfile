# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

# Etapa 2: Execução
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3001
CMD ["node", "index.js"]
