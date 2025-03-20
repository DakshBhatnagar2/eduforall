import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

interface UploadResponse {
  success: boolean;
  message: string;
  url?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
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
    const fileName = `hero-${Date.now()}.jpg`;
    const filePath = join(publicDir, fileName);
    
    console.log('Saving to path:', filePath);

    try {
      // Check if directory is writable
      await access(publicDir);
      await writeFile(filePath, processedImageBuffer);
      console.log('File saved successfully');
    } catch (writeError: any) {
      console.error('Error writing file:', writeError);
      return NextResponse.json(
        { success: false, message: 'Error saving file', details: writeError.message },
        { status: 500 }
      );
    }

    // Return the image URL
    return NextResponse.json({
      success: true,
      message: 'Hero image updated successfully',
      url: `/images/hero/${fileName}`
    });

  } catch (error: any) {
    console.error('Error uploading hero image:', error);
    return NextResponse.json(
      { success: false, message: 'Error uploading image', details: error.message },
      { status: 500 }
    );
  }
} 