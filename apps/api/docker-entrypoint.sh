#!/bin/sh
set -e
# Собираем DATABASE_URL из POSTGRES_*, если не задан (для контейнера)
if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST:-postgres}:5432/${POSTGRES_DB}"
fi
exec "$@"
