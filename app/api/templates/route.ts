import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/constants';

export async function GET() {
  return NextResponse.json(TEMPLATES);
}