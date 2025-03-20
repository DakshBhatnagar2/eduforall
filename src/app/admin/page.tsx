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

  const handleLogout = () => {
    router.push('/admin/logout');
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
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="w-full px-4 py-6 pt-20">
        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max justify-between">
            <div className="flex space-x-4 sm:space-x-8">
              {['overview', 'users', 'content'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize flex items-center`}
                >
                  {tab === 'overview' && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                  {tab === 'users' && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  {tab === 'content' && (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stats Cards */}
              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd className="text-lg font-semibold text-gray-900">1,234</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Programs</dt>
                      <dd className="text-lg font-semibold text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Impact Score</dt>
                      <dd className="text-lg font-semibold text-gray-900">92%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {[1, 2, 3].map((user) => (
                  <li key={user}>
                    <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 sm:mb-0">
                          <p className="text-sm font-medium text-blue-600 truncate">User #{user}</p>
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              user{user}@example.com
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Joined March {user}, 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Hero Section Management */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Hero Section</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Manage the hero section image on the homepage.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-full sm:w-1/2">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                          {heroImageError ? (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Failed to load image
                            </div>
                          ) : (
                            <Image
                              src={heroImage}
                              alt="Hero section"
                              fill
                              className="object-cover"
                              onError={() => {
                                console.error('Error loading hero image:', heroImage);
                                setHeroImageError(true);
                              }}
                              priority
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Current Hero Image
                            </label>
                            <p className="mt-1 text-sm text-gray-500">
                              Upload a new image to replace the current hero section image.
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Upload New Image
                            </label>
                            <div className="mt-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleHeroImageUpload}
                                className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-medium
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Management */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">News Management</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Manage your news articles and announcements.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentArticle(null);
                        setFormData({
                          title: '',
                          content: '',
                          image: '',
                          published: true
                        });
                        setShowNewsForm(true);
                      }}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Article
                    </button>
                  </div>
                </div>

                {showNewsForm && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <form onSubmit={handleSubmitNews} className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Content
                        </label>
                        <textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                          Image URL
                        </label>
                        <input
                          type="text"
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          checked={formData.published}
                          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                          Published
                        </label>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowNewsForm(false)}
                          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {editingArticle ? 'Update Article' : 'Create Article'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {news.map((article) => (
                      <li key={article.id}>
                        <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2 sm:mb-0">
                              <p className="text-sm font-medium text-blue-600 truncate">{article.title}</p>
                              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                article.published
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {article.published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {article.date}
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:space-x-2">
                            <button
                              onClick={() => handleEditNews(article)}
                              className="w-full sm:w-auto px-3 py-1 text-sm text-blue-600 hover:text-blue-900 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNews(article.id)}
                              className="w-full sm:w-auto px-3 py-1 text-sm text-red-600 hover:text-red-900 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Programs Management */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Programs Management</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Manage your educational programs and initiatives.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Primary Education Initiative</h4>
                        <p className="text-sm text-gray-500">Quality primary education for underserved children</p>
                      </div>
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Program
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Community Learning Centers</h4>
                        <p className="text-sm text-gray-500">Learning centers for children unable to attend traditional schools</p>
                      </div>
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Management Link */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gallery Management</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Upload and manage images in your gallery.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push('/admin/gallery')}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Manage Gallery
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard); 