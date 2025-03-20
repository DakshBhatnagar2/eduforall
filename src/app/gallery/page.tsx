'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-2 py-4">
        <h1 className="text-3xl font-bold text-center mb-4">Our Gallery</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-1">
            {images.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-1"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto"
                    style={{
                      display: 'block',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-h-[90vh] w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
} 