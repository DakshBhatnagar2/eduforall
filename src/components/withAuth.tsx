'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();

    useEffect(() => {
      const authToken = Cookies.get('adminAuth');
      if (!authToken) {
        router.push('/admin/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
} 