# Сервис заметок

API - Laravel 13 и MySQL, интерфейс - React 19

## Запуск

```bash
docker compose up -d
```

- интерфейс — http://localhost:8080
- Swagger UI — http://localhost:8080/docs/
- API — http://localhost:8080/api/notes

Остановить - `docker compose down -v`

## Тесты

```bash
docker compose exec app php artisan test
```


## Фронтенд


```bash
cd frontend
npm install
npm run dev
```