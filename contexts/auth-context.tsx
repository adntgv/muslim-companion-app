'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSession, account } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  checkSession: async () => {},
  isAuthenticated: false,
  error: null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkSession = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: session, error: sessionError } = await getCurrentSession();
      
      if (sessionError) {
        setUser(null);
        setIsAuthenticated(false);
        setError(sessionError.message);
        
        // Only show toast for non-401 errors or when not on auth-related pages
        const isAuthPage = window.location.pathname.includes('/login') || 
                          window.location.pathname.includes('/register');
        if (sessionError.code !== 401 || !isAuthPage) {
          toast.error(sessionError.message);
        }
        
        handleUnauthenticated();
        return;
      }

      if (session) {
        setUser(session);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        handleUnauthenticated();
      }
    } catch (error) {
      console.error('Unexpected session check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      setError('An unexpected error occurred');
      handleUnauthenticated();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnauthenticated = () => {
    const protectedRoutes = ['/dashboard', '/profile'];
    const currentPath = window.location.pathname;
    if (protectedRoutes.some(route => currentPath.includes(route))) {
      router.push('/login');
    }
  };

  useEffect(() => {
    // Initial session check
    checkSession();
    
    // Set up an interval to check the session periodically
    const interval = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, checkSession, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 