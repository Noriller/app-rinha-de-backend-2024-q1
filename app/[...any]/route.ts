import { NextResponse } from 'next/server';

export async function GET(
  _: never,
  { params: { any } }: { params: { any: string; }; },
) {
  return NextResponse.json({}, { status: 404 });
}

export const dynamic = 'force-dynamic';
