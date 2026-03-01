import { defineConfig, env } from 'prisma/config';

// Только process.env — задаётся снаружи (dotenv-cli -e .env.prod / .env.dev). Не грузим .env здесь, чтобы не перезаписать порт.
const databaseUrl = process.env.DATABASE_URL ?? env('DATABASE_URL');

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
