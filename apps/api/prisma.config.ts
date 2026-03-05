import { defineConfig, env } from 'prisma/config';

// process.env задаётся снаружи (dotenv-cli -e .env.dev и т.д.). Для prisma generate URL не нужен — подставляем заглушку.
function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    return env('DATABASE_URL');
  } catch {
    return 'postgresql://localhost:5432/placeholder';
  }
}
const databaseUrl = getDatabaseUrl();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
