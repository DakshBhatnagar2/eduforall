import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ imageUrl: '/images/hero/hero.jpg' });
} 