'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import { authService } from '@/lib/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  checkSession: async () => {},
  isAuthenticated: false,
  error: null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkSession = async () => {
    // This is now handled by the auth state listener in useEffect
    // but keeping the method for API compatibility
  };

  const logout = async () => {
    try {
      const { error } = await authService.logout();
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  const handleUnauthenticated = () => {
    const protectedRoutes = ['/dashboard', '/profile', '/manage-actions', '/daily-planner'];
    const currentPath = window.location.pathname;
    
    if (protectedRoutes.some(route => currentPath.includes(route))) {
      router.push('/login');
    }
  };

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setIsLoading(true);
      
      if (currentUser) {
        // We're using the direct Firebase auth object to get the full User object
        setUser(currentUser);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        handleUnauthenticated();
      }
      
      setIsLoading(false);
    });
    
    // Clean up the listener
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      checkSession, 
      isAuthenticated, 
      error, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 