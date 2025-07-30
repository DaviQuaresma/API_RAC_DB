#!/bin/sh

# Aguarda o banco antes de migrar
./wait-for.sh postgres 5432

echo "🟡 Executando migrations PostgreSQL..."
npx prisma migrate deploy

echo "🚀 Subindo app..."
node index.js
