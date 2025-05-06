import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthResponse {
  data: UserCredential | null;
  error: AuthError | null;
}

interface AuthError {
  code: string;
  message: string;
  type: string;
}

// Handle Firebase auth errors
const handleAuthError = (error: any): AuthError => {
  console.error('Firebase auth error:', error);
  
  const errorCode = error.code || 'unknown';
  
  // Map Firebase auth errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Invalid email or password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/invalid-email': 'Please provide a valid email address',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Please check your connection'
  };
  
  return {
    code: errorCode,
    message: errorMap[errorCode] || error.message || 'An unexpected error occurred',
    type: errorCode
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
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
}; 