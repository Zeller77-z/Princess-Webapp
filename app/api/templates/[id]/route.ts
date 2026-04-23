import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    
    const {
      name, product_name, product_benefits, emotional_response, target_audience,
      campaign_goal, framework, tone, platform, content_pillars, cta_style,
      reels_count, carousel_count, days_count, product_image_urls, user_profile_id
    } = body;

    await pool.execute(
      `UPDATE campaign_settings SET 
        name = ?, product_name = ?, product_benefits = ?, emotional_response = ?, target_audience = ?,
        campaign_goal = ?, framework = ?, tone = ?, platform = ?, content_pillars = ?, cta_style = ?,
        reels_count = ?, carousel_count = ?, days_count = ?, product_image_urls = ?, user_profile_id = ?
      WHERE id = ?`,
      [
        name || '', product_name || '', product_benefits || '', emotional_response || '', target_audience || '',
        campaign_goal || '', framework || '', tone || '', platform || '', content_pillars || '', cta_style || '',
        reels_count || 0, carousel_count || 0, days_count || 0, JSON.stringify(product_image_urls || []), user_profile_id || null,
        id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM campaign_settings WHERE id = ?', [id]);
    const updated = (rows as any[])[0];
    if (updated.product_image_urls && typeof updated.product_image_urls === 'string') {
      updated.product_image_urls = JSON.parse(updated.product_image_urls);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    await pool.execute('DELETE FROM campaign_settings WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
