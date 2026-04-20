import { PostgresStore } from '@mastra/pg';

export const pStore = new PostgresStore({
  id: '07ai-store',
  connectionString: process.env.DATABASE_URL!,
});
