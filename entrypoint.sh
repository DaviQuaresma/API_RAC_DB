#!/bin/sh

# Executa as migrations antes de iniciar o app
npx prisma migrate deploy

# Inicia o app
node index.js
