import { NextResponse } from 'next/server';

export async function GET(
  _: never,
) {
  return NextResponse.json({}, { status: 404 });
}

export const dynamic = 'force-dynamic';
