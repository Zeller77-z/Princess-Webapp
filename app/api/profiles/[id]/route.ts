import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const { gemini_api_key } = body;

    if (gemini_api_key === undefined) {
      return NextResponse.json({ error: 'gemini_api_key is required' }, { status: 400 });
    }

    await pool.execute(
      'UPDATE user_profiles SET gemini_api_key = ? WHERE id = ?',
      [gemini_api_key, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
