import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { imageSrc } = await request.json();
    
    if (!imageSrc) {
      return NextResponse.json(
        { error: 'No image source provided' },
        { status: 400 }
      );
    }

    // Extract filename from imageSrc
    const filename = imageSrc.split('/').pop();
    if (!filename) {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 400 }
      );
    }

    // Construct full path
    const path = join(process.cwd(), 'public/images/gallery', filename);

    // Delete the file
    await unlink(path);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
} 