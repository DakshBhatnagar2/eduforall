import { NextResponse } from 'next/server';
import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

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

    console.log('File received:', file.name, file.type, file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Save the processed image, replacing the original hero.jpg
    const publicDir = join(process.cwd(), 'public', 'images', 'hero');
    const filePath = join(publicDir, 'hero.jpg');
    
    console.log('Saving to path:', filePath);

    try {
      // Check if directory is writable
      await access(publicDir);
      await writeFile(filePath, processedImageBuffer);
      console.log('File saved successfully');
    } catch (writeError: any) {
      console.error('Error writing file:', writeError);
      return NextResponse.json(
        { error: 'Error saving file', details: writeError.message },
        { status: 500 }
      );
    }

    // Return the image URL
    return NextResponse.json({ 
      imageUrl: '/images/hero/hero.jpg',
      message: 'Hero image updated successfully' 
    });

  } catch (error: any) {
    console.error('Error uploading hero image:', error);
    return NextResponse.json(
      { error: 'Error uploading image', details: error.message },
      { status: 500 }
    );
  }
} 