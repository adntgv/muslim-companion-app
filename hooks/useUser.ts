import { useState, useEffect } from 'react';
import { authService, type AuthSession } from '@/lib/auth'; // Import AuthSession

export function useUser() {
  const [user, setUser] = useState<AuthSession | null>(null); // Use AuthSession
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribeToAuthChanges returns an unsubscribe function
    const unsubscribe = authService.subscribeToAuthChanges((session) => {
      setUser(session);
      setLoading(false); // Set loading to false once auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
