import { NextResponse } from 'next/server';

export function GET(): NextResponse<{ categories: string }> {
  return NextResponse.json({ categories: '/api/categories' });
}
