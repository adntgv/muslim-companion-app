'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSession, account } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  checkSession: async () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkSession = async () => {
    try {
      setIsLoading(true);
      const session = await getCurrentSession();
      if (session) {
        setUser(session);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        handleUnauthenticated();
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      handleUnauthenticated();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnauthenticated = () => {
    // If we're on a protected route, redirect to login
    const protectedRoutes = ['/dashboard', '/profile'];
    const currentPath = window.location.pathname;
    if (protectedRoutes.some(route => currentPath.includes(route))) {
      router.push('/login');
    }
  };

  useEffect(() => {
    checkSession();
    // Set up an interval to check the session periodically
    const interval = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, checkSession, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 