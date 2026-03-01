# Запуск Postgres (Podman Compose)

В контейнере поднимается только **PostgreSQL**. API и фронт запускаются локально.

## Разделение dev и production

Данные **разведены**: у dev и production свои БД и свои тома Postgres.

| Режим    | Файлы окружения | Compose           | БД (пример)      | Том данных        |
|----------|-----------------|-------------------|------------------|-------------------|
| **dev**  | `.env.dev`      | docker-compose.dev.yaml  | calor_craft_dev  | postgres_data_dev |
| **start** (prod) | `.env.prod` | docker-compose.prod.yaml | calor_craft_prod | postgres_data_prod |

Создай из примеров свои файлы (не коммитить):
- `cp .env.example.dev .env.dev` и подставь свои USER/PASSWORD
- `cp .env.example.prod .env.prod` и подставь свои USER/PASSWORD

## Режимы запуска

- **Dev:** `npm run dev` — Postgres (dev-том + БД dev), api и web с hot-reload. Один Ctrl+C останавливает всё.
- **Production:** `npm run start` — сборка, затем Postgres (prod-том + БД prod), api и web; миграции применяются при старте api. Один Ctrl+C останавливает всё.
- **Только Postgres:** `npm run db:up` — поднимает dev Postgres (тот же `docker-compose.dev.yaml` + `.env.dev`).

## Требования

- Файлы **`.env.dev`** и **`.env.prod`** в корне (скопируй из `.env.example.dev` и `.env.example.prod`), в каждом:
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
  - `DATABASE_URL` для API (тот же хост/пользователь/пароль/БД)

## Остановка

Для dev/start: Ctrl+C в терминале останавливает все процессы (в т.ч. Postgres).

Только Postgres, поднятый через `db:up` (или после dev):  
`podman-compose -f docker-compose.dev.yaml down`  
После start (prod): `podman-compose -f docker-compose.prod.yaml down`
