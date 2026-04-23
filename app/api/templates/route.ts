import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId');

    let query = 'SELECT * FROM campaign_settings ORDER BY updated_at DESC';
    let params: any[] = [];

    if (profileId) {
      query = 'SELECT * FROM campaign_settings WHERE user_profile_id = ? ORDER BY updated_at DESC';
      params.push(profileId);
    }

    const [rows] = await pool.query(query, params);
    
    // Parse JSON field for product_image_urls
    const parsedRows = (rows as any[]).map(row => ({
      ...row,
      product_image_urls: typeof row.product_image_urls === 'string' 
        ? JSON.parse(row.product_image_urls) 
        : row.product_image_urls
    }));

    return NextResponse.json(parsedRows);
  } catch (error: any) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = uuidv4();
    
    const {
      name, product_name, product_benefits, emotional_response, target_audience,
      campaign_goal, framework, tone, platform, content_pillars, cta_style,
      reels_count, carousel_count, days_count, product_image_urls, user_profile_id
    } = body;

    await pool.execute(
      `INSERT INTO campaign_settings (
        id, name, product_name, product_benefits, emotional_response, target_audience,
        campaign_goal, framework, tone, platform, content_pillars, cta_style,
        reels_count, carousel_count, days_count, product_image_urls, user_profile_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, name || '', product_name || '', product_benefits || '', emotional_response || '', target_audience || '',
        campaign_goal || '', framework || '', tone || '', platform || '', content_pillars || '', cta_style || '',
        reels_count || 0, carousel_count || 0, days_count || 0, JSON.stringify(product_image_urls || []), user_profile_id || null
      ]
    );

    const [rows] = await pool.query('SELECT * FROM campaign_settings WHERE id = ?', [id]);
    const inserted = (rows as any[])[0];
    if (inserted.product_image_urls && typeof inserted.product_image_urls === 'string') {
      inserted.product_image_urls = JSON.parse(inserted.product_image_urls);
    }
    
    return NextResponse.json(inserted);
  } catch (error: any) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
