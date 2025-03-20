'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GalleryImage } from '@/utils/gallery';
import { withAuth } from '@/components/withAuth';

function GalleryManagement() {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
  };

  const handleLogout = () => {
    router.push('/admin/logout');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress({});

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const uploadId = `${file.name}-${Date.now()}`;
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));

        try {
          const response = await fetch('/api/gallery/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }

          setUploadProgress(prev => ({ ...prev, [uploadId]: 100 }));
          return response.json();
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          throw error;
        }
      });

      await Promise.all(uploadPromises);
      await loadGalleryImages();
    } catch (error) {
      console.error('Error during upload:', error);
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
    }
  };

  const handleDeleteImage = async (imageSrc: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/gallery/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      });

      if (response.ok) {
        setImages(images.filter(img => img.src !== imageSrc));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedImages.size} images?`)) return;

    setIsDeleting(true);
    try {
      const deletePromises = Array.from(selectedImages).map(async (imageSrc) => {
        const response = await fetch('/api/gallery/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageSrc }),
        });

        if (!response.ok) {
          throw new Error(`Failed to delete ${imageSrc}`);
        }
      });

      await Promise.all(deletePromises);
      setImages(images.filter(img => !selectedImages.has(img.src)));
      setSelectedImages(new Set());
      setIsSelectionMode(false);
    } catch (error) {
      console.error('Error during bulk delete:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleImageSelection = (imageSrc: string) => {
    setSelectedImages(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(imageSrc)) {
        newSelection.delete(imageSrc);
      } else {
        newSelection.add(imageSrc);
      }
      return newSelection;
    });
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (!isSelectionMode) {
      setSelectedImages(new Set());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Gallery</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isSelectionMode && (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {selectedImages.size} selected
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    disabled={selectedImages.size === 0 || isDeleting}
                    className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Delete Selected</span>
                    <span className="sm:hidden">{selectedImages.size}</span>
                  </button>
                </div>
              )}
              <button
                onClick={toggleSelectionMode}
                className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSelectionMode
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-blue-500'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500'
                }`}
              >
                {isSelectionMode ? 'Cancel' : 'Select'}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 sm:px-4 sm:py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Upload Section */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-4 sm:mb-8">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">Upload Images</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Select multiple images to upload to your gallery
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {images.length} {images.length === 1 ? 'image' : 'images'} in gallery
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`relative cursor-pointer block w-full rounded-lg border-2 border-dashed p-6 sm:p-12 text-center hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : 'border-gray-300'
                    }`}
                  >
                    <div className="space-y-2">
                      <svg
                        className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>

                {/* Upload Progress */}
                {Object.keys(uploadProgress).length > 0 && (
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(uploadProgress).map(([uploadId, progress]) => (
                      <div key={uploadId} className="flex items-center space-x-2 sm:space-x-3">
                        <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{progress}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-3 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
                {images.map((image) => (
                  <div
                    key={image.src}
                    className={`group relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer ${
                      isSelectionMode ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => isSelectionMode && toggleImageSelection(image.src)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        isSelectionMode ? 'group-hover:scale-105' : ''
                      }`}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw"
                    />
                    {isSelectionMode ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedImages.has(image.src)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {selectedImages.has(image.src) && (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.src);
                          }}
                          disabled={isDeleting}
                          className="p-1.5 sm:p-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(GalleryManagement); 