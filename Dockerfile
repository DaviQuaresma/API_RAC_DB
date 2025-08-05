# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

COPY . .

# Etapa 2: Execução
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

COPY wait-for.sh .
COPY entrypoint.sh .

RUN chmod +x wait-for.sh entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]
