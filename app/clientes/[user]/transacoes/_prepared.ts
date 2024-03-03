import { db } from '#/infra/db';
import { transactions } from '#/infra/schema';
import { desc, eq, sql } from 'drizzle-orm';

export const preparedInsert = db.insert(transactions)
  .values({
    user: sql.placeholder('user'),
    last: sql.placeholder('last'),
    type: sql.placeholder('type'),
    desc: sql.placeholder('desc'),
    val: sql.placeholder('val'),
    bal: sql.placeholder('bal'),
  })
  .returning({
    bal: transactions.bal,
  })
  .prepare();

export const preparedGetLast = db
  .select({
    id: transactions.id,
    bal: transactions.bal,
  })
  .from(transactions)
  .where(eq(
    transactions.user,
    sql.placeholder('user'),
  ))
  .orderBy(desc(transactions.id))
  .limit(1)
  .prepare();
