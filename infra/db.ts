import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

export const sqlite = new Database('data/data.db');

sqlite.pragma('journal_mode = WAL');

sqlite.pragma('synchronous = normal');

// store index in memory
// sqlite.pragma('temp_store = memory');

// to try later
sqlite.pragma('mmap_size = 30000000000');
// sqlite.pragma('page_size = 32768');

export const db = drizzle(sqlite, {
  schema,
  // logger: true
});

export const errors = {
  SQLITE_ERROR: 'SQLITE_ERROR',
  SQLITE_CONSTRAINT_NOTNULL: 'SQLITE_CONSTRAINT_NOTNULL',
  SQLITE_CONSTRAINT_UNIQUE: 'SQLITE_CONSTRAINT_UNIQUE',
  SQLITE_CONSTRAINT_CHECK: 'SQLITE_CONSTRAINT_CHECK',
};
