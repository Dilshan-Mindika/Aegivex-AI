'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('aegivex_token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('aegivex_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('aegivex_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return { token, isAuthenticated, loading, login, logout };
}
