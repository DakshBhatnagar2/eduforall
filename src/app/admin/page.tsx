'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import newsData from '@/data/news.json';
import { GalleryImage } from '@/utils/gallery';
import Image from 'next/image';
import { withAuth } from '@/components/withAuth';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  published: boolean;
}

function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [news, setNews] = useState<NewsArticle[]>(newsData.articles);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    published: true
  });
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [heroImage, setHeroImage] = useState<string>('/images/hero/hero.jpg');
  const [heroImageError, setHeroImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load gallery images
    const loadGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryImages(data.images);
      } catch (error) {
        console.error('Error loading gallery:', error);
      }
    };

    loadGallery();
  }, []);

  useEffect(() => {
    // Load current hero image
    const loadHeroImage = async () => {
      try {
        const response = await fetch('/api/hero/current');
        const data = await response.json();
        if (data.imageUrl) {
          setHeroImage(data.imageUrl);
        }
      } catch (error) {
        console.error('Error loading hero image:', error);
        setHeroImageError(true);
      }
    };

    loadHeroImage();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        setError('Failed to logout');
      }
    } catch (err) {
      setError('An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNews = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      image: article.image,
      published: article.published
    });
    setShowNewsForm(true);
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setNews(news.filter(article => article.id !== id));
    }
  };

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      // Update existing article
      setNews(news.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...formData }
          : article
      ));
    } else {
      // Add new article
      const newArticle: NewsArticle = {
        id: Math.max(...news.map(a => a.id)) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setNews([...news, newArticle]);
    }
    setShowNewsForm(false);
    setEditingArticle(null);
    setFormData({
      title: '',
      content: '',
      image: '',
      published: true
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh gallery images
        const galleryResponse = await fetch('/api/gallery');
        const data = await galleryResponse.json();
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteImage = async (imageSrc: string) => {
    try {
      const response = await fetch('/api/gallery/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      });

      if (response.ok) {
        // Refresh gallery images
        const galleryResponse = await fetch('/api/gallery');
        const data = await galleryResponse.json();
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/hero/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New hero image URL:', data.imageUrl);
        // Force a refresh of the image by adding a timestamp
        setHeroImage(`${data.imageUrl}?t=${Date.now()}`);
        setHeroImageError(false);
      } else {
        console.error('Failed to upload hero image');
      }
    } catch (error) {
      console.error('Error uploading hero image:', error);
      setHeroImageError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard cards will go here */}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard); 