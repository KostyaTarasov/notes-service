#!/bin/sh
set -e

grep -q '^APP_KEY=.' .env || php artisan key:generate --force

until php -r 'new PDO("mysql:host=".getenv("DB_HOST").";port=".getenv("DB_PORT"), getenv("DB_USERNAME"), getenv("DB_PASSWORD"));' 2>/dev/null; do
    echo "Ожидание базы данных..."
    sleep 2
done

php artisan migrate --force

exec "$@"
