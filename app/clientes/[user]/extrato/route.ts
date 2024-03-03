import { getLimit } from '#/infra/limits';
import { NextResponse } from 'next/server';
import { UserIdString } from '../../_helpers/UserIdString';
import { preparedGetStatement } from './_prepared';

export async function GET(
  _: never,
  { params: { user } }: { params: { user: UserIdString; }; },
) {
  if (Number(user) > 5 || Number(user) < 1) {
    return NextResponse.json({}, { status: 404 });
  }

  const statements = preparedGetStatement.all({ user });

  return NextResponse.json({
    saldo: {
      total: statements[0]?.balance || 0,
      data_extrato: new Date().toISOString(),
      limite: getLimit(user),
    },
    ultimas_transacoes: statements,
  }, { status: 200 });
}

export const dynamic = 'force-dynamic';
