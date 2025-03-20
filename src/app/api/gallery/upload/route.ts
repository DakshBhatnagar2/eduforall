import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getGalleryImages } from '@/utils/gallery';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const path = join(process.cwd(), 'public/images/gallery', filename);

    // Save the file
    await writeFile(path, buffer);

    // Return the new image data
    return NextResponse.json({
      success: true,
      image: {
        src: `/images/gallery/${filename}`,
        alt: file.name,
        width: 0, // These will be updated by the gallery utility
        height: 0
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    );
  }
} 