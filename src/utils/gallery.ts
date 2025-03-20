import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const galleryPath = path.join(process.cwd(), 'public/images/gallery');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(galleryPath)) {
      fs.mkdirSync(galleryPath, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(galleryPath);

    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(galleryPath, file);
        const metadata = await sharp(filePath).metadata();
        
        return {
          src: `/images/gallery/${file}`,
          alt: file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
          width: metadata.width || 800,
          height: metadata.height || 600
        };
      })
    );

    return images;
  } catch (error) {
    console.error('Error in getGalleryImages:', error);
    return [];
  }
} 