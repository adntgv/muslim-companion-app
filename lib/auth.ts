import { User } from 'firebase/auth';
import { config } from './config';
import * as firebaseAuth from './firebase-auth';

export interface AuthSession {
  userId: string;
  name: string | null;
  email: string | null;
}

export interface AuthError {
  message: string;
  code: string;
  type: string;
}

// Helper to convert Firebase User to a standardized auth session
const convertUserToSession = (user: User): AuthSession => {
  return {
    userId: user.uid,
    name: user.displayName,
    email: user.email,
  };
};

export const authService = {
  // Create a new account
  async createAccount(email: string, password: string, name: string) {
    const result = await firebaseAuth.createAccount(email, password, name);
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    if (result.data && result.data.user) {
      return { 
        data: convertUserToSession(result.data.user), 
        error: null 
      };
    }
    
    return { 
      data: null, 
      error: { 
        message: 'Account was created but session could not be established',
        code: 'auth/session-error',
        type: 'session_error'
      } 
    };
  },
  
  // Login with email and password
  async loginWithEmail(email: string, password: string) {
    const result = await firebaseAuth.loginWithEmail(email, password);
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    if (result.data && result.data.user) {
      return { 
        data: convertUserToSession(result.data.user), 
        error: null 
      };
    }
    
    return { 
      data: null, 
      error: { 
        message: 'Login successful but session could not be established',
        code: 'auth/session-error',
        type: 'session_error'
      } 
    };
  },
  
  // Login with Google
  async loginWithGoogle() {
    try {
      const result = await firebaseAuth.loginWithGoogle();
      
      if (result.error) {
        return { data: null, error: result.error };
      }
      
      if (result.data && result.data.user) {
        return { 
          data: convertUserToSession(result.data.user), 
          error: null 
        };
      }
      
      return { 
        data: null, 
        error: { 
          message: 'Google login successful but session could not be established',
          code: 'auth/session-error',
          type: 'session_error'
        } 
      };
    } catch (error: any) {
      return { 
        data: null, 
        error: { 
          message: error.message || 'An error occurred during Google login',
          code: error.code || 'auth/google-login-error',
          type: 'google_login_error'
        } 
      };
    }
  },
  
  // Log out
  async logout() {
    const result = await firebaseAuth.logout();
    return { error: result.error };
  },
  
  // Get current session
  async getCurrentSession() {
    try {
      const result = firebaseAuth.getCurrentUser();
      
      if (result.error) {
        return { data: null, error: result.error };
      }
      
      if (result.data) {
        return { 
          data: convertUserToSession(result.data), 
          error: null 
        };
      }
      
      return { data: null, error: null };
    } catch (error: any) {
      console.error('Error getting current session:', error);
      return { 
        data: null, 
        error: {
          message: error.message || 'Failed to get current session',
          code: error.code || 'auth/session-error',
          type: 'session_error'
        }
      };
    }
  },
  
  // Subscribe to auth changes
  subscribeToAuthChanges(callback: (session: AuthSession | null) => void) {
    return firebaseAuth.subscribeToAuthChanges((user) => {
      if (user) {
        callback(convertUserToSession(user));
      } else {
        callback(null);
      }
    });
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    return firebaseAuth.isAuthenticated();
  }
}; 