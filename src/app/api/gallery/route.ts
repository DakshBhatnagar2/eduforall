import { NextResponse } from 'next/server';
import { getGalleryImages } from '@/utils/gallery';

export async function GET() {
  try {
    const images = await getGalleryImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Error fetching gallery images' },
      { status: 500 }
    );
  }
} 