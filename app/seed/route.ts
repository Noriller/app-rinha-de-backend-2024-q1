import { db } from '#/infra/db';
import { seed } from '#/infra/seed';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { NextResponse } from 'next/server';

export async function GET() {
  migrate(db, { migrationsFolder: './drizzle' });

  const seeded = await seed();

  return NextResponse.json({ seeded }, { status: 200 });
}

export const dynamic = 'force-dynamic';
