# Calor Craft

Веб-приложение для учёта калорий: дневник питания и база продуктов. Монорепозиторий (React + Vite, NestJS, PostgreSQL).

## Требования

- Node.js 18+
- Podman (и `podman-compose`) — для контейнера Postgres

## Первый запуск

1. Установи зависимости:
   ```bash
   npm install
   ```

2. Создай файлы окружения. В репозитории лежат шаблоны `.env.example.dev` и `.env.example.prod` (они не в .gitignore). Скопируй их и подставь свои данные:
   ```bash
   copy .env.example.dev .env.dev
   copy .env.example.prod .env.prod
   ```
   Открой `.env.dev` и `.env.prod`, подставь свои `POSTGRES_USER` и `POSTGRES_PASSWORD`. Остальные переменные можно не менять.

   Если файлов-примеров нет (например, старый клон), создай `.env.dev` и `.env.prod` вручную с переменными: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `DATABASE_URL` (в prod ещё `PORT=3001`). Образец — в корне в файлах `.env.example.dev` и `.env.example.prod`.

## Режим разработки (dev)

Одна команда поднимает Postgres (контейнер), API и фронт с hot-reload:

```bash
npm run dev
```

Остановка: **Ctrl+C** (останавливаются все три процесса).

- **Postgres:** localhost:5432  
- **API:** http://localhost:3000  
- **Фронт:** http://localhost:5173  

Миграции применяются автоматически при старте API (как и в prod). После изменений в `apps/api/prisma/schema.prisma` нужно **создать** новую миграцию и применить её:

```bash
npm run db:dev:migrate
```
(Postgres должен быть запущен, например через `npm run dev` в другом терминале или после остановки dev.)

## Режим production (start)

Сборка и запуск Postgres, API и фронта в production-режиме:

```bash
npm run start
```

Остановка: **Ctrl+C**.

- **Postgres:** localhost:5433  
- **API:** http://localhost:3001  
- **Фронт:** http://localhost:4173  

Миграции применяются автоматически при старте API. Порты отличаются от dev, чтобы можно было одновременно держать запущенными dev и production.

## Дополнительные команды

| Команда | Описание |
|--------|----------|
| `npm run db:dev:up` | Только поднять dev Postgres (без API и фронта). |
| `npm run db:dev:migrate` | Создать новую миграцию и применить к dev-БД (после правок в schema.prisma). |
| `npm run db:dev:down` | Остановить контейнер dev Postgres. |
| `npm run db:prod:down` | Остановить контейнер prod Postgres. |
| `npm run build` | Собрать API и фронт (без запуска). |

## Остановка Postgres

- После `npm run db:dev:up` или `npm run dev`: **`npm run db:dev:down`**
- После `npm run start` (prod): **`npm run db:prod:down`**

## Структура

- `apps/api` — NestJS API (Prisma, PostgreSQL)
- `apps/web` — React + Vite
- `.env.dev` / `.env.prod` — переменные для dev и production (не коммитить)
- `docker-compose.dev.yaml` / `docker-compose.prod.yaml` — контейнер Postgres для dev и prod
