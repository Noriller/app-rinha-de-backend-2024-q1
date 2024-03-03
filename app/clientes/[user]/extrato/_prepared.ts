import { db } from '#/infra/db';
import { transactions } from '#/infra/schema';
import { and, desc, eq, ne, sql } from 'drizzle-orm';

export const preparedGetStatement = db
  .select({
    tipo: transactions.type,
    descricao: transactions.desc,
    valor: transactions.val,
    realizada_em: transactions.time,
    balance: transactions.bal,
  })
  .from(transactions)
  .where(and(
    eq(transactions.user, sql.placeholder('user')),
    // remove the seed from the statement
    ne(transactions.type, 'i'),
  ))
  .orderBy(desc(transactions.id))
  .limit(10)
  .prepare();
