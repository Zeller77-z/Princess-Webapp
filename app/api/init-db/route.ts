import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // 1. user_profiles table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        emoji VARCHAR(10) NOT NULL,
        gemini_api_key VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. campaign_settings table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS campaign_settings (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        product_name VARCHAR(255),
        product_benefits TEXT,
        emotional_response TEXT,
        target_audience TEXT,
        campaign_goal TEXT,
        framework VARCHAR(100),
        tone VARCHAR(100),
        platform VARCHAR(50),
        content_pillars TEXT,
        cta_style VARCHAR(100),
        reels_count INT DEFAULT 0,
        carousel_count INT DEFAULT 0,
        days_count INT DEFAULT 0,
        product_image_urls JSON,
        user_profile_id VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_profile_id) REFERENCES user_profiles(id) ON DELETE CASCADE
      )
    `);

    return NextResponse.json({ 
      success: true, 
      message: 'Database tables successfully verified and initialized!' 
    });
  } catch (error: any) {
    console.error('Database Initialization Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      host: process.env.DB_HOST || 'default (127.0.0.1)',
      user: process.env.DB_USER || 'default (root)',
      database: process.env.DB_NAME || 'default (princess_db)',
      tip: 'Check your Hostinger Environment Variables to ensure the database credentials are correct.'
    }, { status: 500 });
  }
}
