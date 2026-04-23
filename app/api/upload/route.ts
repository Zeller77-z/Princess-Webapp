import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { base64, contentType, fileName } = body;

    if (!base64 || !fileName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the directory exists
    try {
      await fs.access(publicUploadsDir);
    } catch {
      await fs.mkdir(publicUploadsDir, { recursive: true });
    }

    const filePath = path.join(publicUploadsDir, fileName);
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64, 'base64');
    
    // Write to disk
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
