import { errors } from '#/infra/db';
import { getLimit } from '#/infra/limits';
import { Transaction } from '#clientes/_helpers/Transaction';
import { NextRequest, NextResponse } from 'next/server';
import { UserIdString } from '../../_helpers/UserIdString';
import { preparedGetLast, preparedInsert } from './_prepared';

export async function POST(
  req: NextRequest,
  { params: { user } }: { params: { user: UserIdString; }; },
) {
  if (Number(user) > 5 || Number(user) < 1) {
    return NextResponse.json({}, { status: 404 });
  }

  const { descricao, tipo, valor } = await req.json() as Transaction;

  if (isInvalid({ descricao, tipo, valor })) {
    return NextResponse.json({}, { status: 422 });
  }

  return doInsert({ user, tipo, descricao, valor });
}

function isInvalid({ descricao, tipo, valor }: Transaction) {
  return (
    !valor
    // no negative values
    || valor <= 0
    // no decimal
    || valor % 1 !== 0
    // only c or d
    || ['c', 'd'].indexOf(tipo) === -1
    // descricao between 1 and 10 chars
    || !descricao?.trim()
    || descricao?.length > 10
  );
}

function doInsert({
  user,
  tipo,
  descricao,
  valor,
}: {
  user: UserIdString;
  tipo: 'c' | 'd';
  descricao: string;
  valor: number;
  }, tries = 10) {
  // since it's seeded, there will be a last transaction
  const { bal, id: last } = preparedGetLast.get({ user })!;

  const newBal = bal + (tipo === 'c' ? valor : -valor);

  const userLimit = getLimit(user);

  // while limit is smaller than
  // new balance then its ok
  // when limit is equal to new balance
  // only then we return a 422
  // since equal is not bigger
  // this catches the cases we need
  if (-userLimit > newBal) {
    // NOPE
    return NextResponse.json({}, { status: 422 });
  }

  try {
    preparedInsert.get({
      user,
      last,
      type: tipo,
      desc: descricao,
      val: valor,
      bal: newBal,
    });

    return NextResponse.json({
      limite: userLimit,
      saldo: newBal,
    });
  } catch (error: any) {
    // somehow passed the check
    if (error.code === errors.SQLITE_CONSTRAINT_CHECK) {
      return NextResponse.json({}, { status: 422 });
    }

    // concurrency error
    if (error.code === errors.SQLITE_CONSTRAINT_UNIQUE) {
      // try again, but not until it passes
      // as to not cause infinite loops
      // this will help under heavy loads
      // at the cost of some calls being returned
      if (tries <= 0) {
        return NextResponse.json({}, { status: 422 });
      }
      // try again
      return doInsert({ user, tipo, descricao, valor }, tries - 1);
    }

    // ???
    return NextResponse.json({}, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
