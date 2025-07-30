#!/bin/sh
# wait-for.sh

host="$1"
port="$2"

echo "⏳ Aguardando banco de dados em $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 0.5
done

echo "✅ Banco disponível em $host:$port!"
