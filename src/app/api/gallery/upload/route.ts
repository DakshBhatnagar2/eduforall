import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

interface UploadResponse {
  success: boolean;
  message: string;
  url?: string;
}

interface FileSystemError extends Error {
  code?: string;
  path?: string;
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

    // Save the processed image
    const publicDir = join(process.cwd(), 'public', 'images', 'gallery');
    const fileName = `gallery-${Date.now()}.jpg`;
    const filePath = join(publicDir, fileName);
    
    console.log('Saving to path:', filePath);

    try {
      // Check if directory is writable
      await access(publicDir);
      await writeFile(filePath, processedImageBuffer);
      console.log('File saved successfully');
    } catch (writeError: unknown) {
      const error = writeError as FileSystemError;
      console.error('Error writing file:', error);
      return NextResponse.json(
        { success: false, message: 'Error saving file', details: error.message },
        { status: 500 }
      );
    }

    // Return the image URL
    return NextResponse.json({
      success: true,
      message: 'Gallery image uploaded successfully',
      url: `/images/gallery/${fileName}`
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error uploading gallery image:', err);
    return NextResponse.json(
      { success: false, message: 'Error uploading image', details: err.message },
      { status: 500 }
    );
  }
} 