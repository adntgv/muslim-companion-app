import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthError {
  message: string;
  code: string;
  type: string;
}

interface AuthResponse {
  data: UserCredential | null;
  error: AuthError | null;
}

interface UserResponse {
  data: User | null;
  error: AuthError | null;
}

// Error handling utility
const handleAuthError = (error: any): AuthError => {
  console.error('Firebase auth error details:', {
    code: error.code,
    message: error.message,
    stack: error.stack
  });
  
  // Map Firebase auth errors to user-friendly messages
  if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
    return {
      message: 'Invalid email or password.',
      code: error.code,
      type: 'invalid_credentials'
    };
  } else if (error.code === 'auth/email-already-in-use') {
    return {
      message: 'An account with this email already exists.',
      code: error.code,
      type: 'user_already_exists'
    };
  } else if (error.code === 'auth/too-many-requests') {
    return {
      message: 'Too many attempts. Please try again later.',
      code: error.code,
      type: 'too_many_requests'
    };
  } else if (error.code === 'auth/user-disabled') {
    return {
      message: 'This account has been disabled.',
      code: error.code,
      type: 'user_disabled'
    };
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
    code: error.code || 'unknown_error',
    type: 'unknown_error'
  };
};

// Create account with email and password
export const createAccount = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with name
    if (credential.user) {
      await updateProfile(credential.user, {
        displayName: name
      });
    }
    
    return { data: credential, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
};

// Sign in with email and password
export const loginWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { data: credential, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
};

// Sign in with Google
export const loginWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return { data: credential, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
};

// Sign out
export const logout = async (): Promise<{ error: AuthError | null }> => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
};

// Get current user
export const getCurrentUser = (): UserResponse => {
  const user = auth.currentUser;
  if (user) {
    return { data: user, error: null };
  }
  return { 
    data: null, 
    error: {
      message: 'No user is currently signed in',
      code: 'auth/no-current-user',
      type: 'no_current_user'
    } 
  };
};

// Listen to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
}; 