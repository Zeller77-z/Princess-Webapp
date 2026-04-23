import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM user_profiles ORDER BY created_at ASC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, emoji } = body;
    
    if (!name || !emoji) {
      return NextResponse.json({ error: 'Name and emoji are required' }, { status: 400 });
    }

    const id = uuidv4();
    const [result] = await pool.execute(
      'INSERT INTO user_profiles (id, name, emoji) VALUES (?, ?, ?)',
      [id, name, emoji]
    );

    const [rows] = await pool.query('SELECT * FROM user_profiles WHERE id = ?', [id]);
    return NextResponse.json((rows as any[])[0]);
  } catch (error: any) {
    console.error('Error creating profile:', error);
    // Duplicate entry (MySQL ER_DUP_ENTRY code is 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'A profile with this name already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
