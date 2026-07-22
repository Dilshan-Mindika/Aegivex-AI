'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth(requireAuth = false) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('aegivex_token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (requireAuth && !['/', '/login', '/register'].includes(pathname)) {
          router.push('/login');
        }
      }
      setLoading(false);
    }
  }, [requireAuth, pathname, router]);

  const login = (newToken: string) => {
    localStorage.setItem('aegivex_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('aegivex_token');
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { token, isAuthenticated, loading, login, logout };
}
