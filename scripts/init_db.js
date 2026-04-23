require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function initDB() {
  console.log('Connecting to MySQL database...');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'princess_db'
    });

    console.log('Connected! Creating tables if they do not exist...');

    // 1. user_profiles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        emoji VARCHAR(10) NOT NULL,
        gemini_api_key VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('user_profiles table ready.');

    // 2. campaign_settings table
    await connection.execute(`
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
    console.log('campaign_settings table ready.');

    console.log('Database initialization complete!');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();
