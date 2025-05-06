import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';
import { User } from 'firebase/auth';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await authService.getCurrentSession();
        if (result.data) {
          // Since authService returns a simplified session object instead of a User object,
          // we need to adapt it to match the User interface
          setUser({
            uid: result.data.userId,
            email: result.data.email,
            displayName: result.data.name,
            // Add other necessary properties to satisfy the User interface
          } as unknown as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return { user, loading };
} 