'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove the authentication cookie
    Cookies.remove('adminAuth');
    
    // Redirect to login page after a short delay
    const timeout = setTimeout(() => {
      router.push('/admin/login');
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-lg font-medium text-gray-900">Logging out...</h2>
            <p className="mt-2 text-sm text-gray-500">You will be redirected to the login page shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 