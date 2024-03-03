import type { Config } from 'drizzle-kit';

export default {
  schema: './infra/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'data/data.db',
  },
} satisfies Config;
