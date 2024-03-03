import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

/**
 * Not gonna bother with a proper schema
 * especially concerning users
 */
export const transactions = sqliteTable('transactions', {
  /** transaction id */
  id: integer('id', { mode: 'number' })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  /** user id (1-5) */
  user: integer('user', { mode: 'number' }).notNull(),
  /** last transaction id */
  last: integer('last', { mode: 'number' }).notNull(),
  /**
   * transaction type
   * c and d as per the spec
   * i will be used for the initial value
   */
  type: text('type', { enum: ['c', 'd', 'i'] }).notNull(),
  /** transaction description */
  desc: text('desc', { mode: 'text' }).notNull(),
  /** transaction date */
  time: text('time').default(
    // migration fails without the brackets
    sql`(strftime ('%Y-%m-%dT%H:%M:%fZ'))`,
  ),
  /** transaction value */
  val: integer('val', { mode: 'number' }).notNull(),
  /**
   * user balance
   * gonna calculate and store it here
   * this will either help or hurt
   */
  bal: integer('bal', { mode: 'number' })
    .notNull()
    // HACK: Drizzle does not yet support check constraints as of writing this
    .default(
      // depending on user, get the limit
      sql`null CHECK (
          CASE
            WHEN user = 1 THEN bal > -100001
            WHEN user = 2 THEN bal > -80001
            WHEN user = 3 THEN bal > -1000001
            WHEN user = 4 THEN bal > -10000001
            WHEN user = 5 THEN bal > -500001
            ELSE NULL
          END
        )`,
    ),
}, (t) => ({
  userIdx: index('user_idx').on(t.user),
  /**
   * this is a neat trick to avoid two transactions from
   * the same user being processed at the same time
   * before saving, we will get the last transaction
   * when saving, if a concurrent process already used the last
   * transaction, then we know we should try to process it again
   */
  check: unique('check').on(t.user, t.last),
}));
