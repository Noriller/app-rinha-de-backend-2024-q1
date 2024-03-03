import { sql } from 'drizzle-orm';
import { db } from './db';
import { transactions } from './schema';

export async function seed() {
  db.run(sql`Delete from transactions`);
  db.run(sql`DELETE FROM SQLITE_SEQUENCE WHERE name='transactions'`);

  return db
    .insert(transactions)
    .values([
      { user: 1, last: 0, type: 'i', desc: 'i', val: 0, bal: 0 },
      { user: 2, last: 0, type: 'i', desc: 'i', val: 0, bal: 0 },
      { user: 3, last: 0, type: 'i', desc: 'i', val: 0, bal: 0 },
      { user: 4, last: 0, type: 'i', desc: 'i', val: 0, bal: 0 },
      { user: 5, last: 0, type: 'i', desc: 'i', val: 0, bal: 0 },
    ])
    .onConflictDoNothing()
    .execute();
}
