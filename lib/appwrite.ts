import { Client, Account, Databases, ID } from 'appwrite';
import { config } from './config';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);

interface AppwriteError {
    message: string;
    code: number;
    type: string;
}

// Error handling utility
const handleError = (error: any): AppwriteError => {
    console.error('Appwrite error details:', {
        code: error.code,
        type: error.type,
        message: error.message,
        response: error.response,
        stack: error.stack
    });
    
    // Map Appwrite errors to user-friendly messages
    if (error.code === 401) {
        if (error.type === 'general_unauthorized_scope') {
            return {
                message: 'Please log in to continue.',
                code: error.code,
                type: error.type
            };
        }
        return {
            message: 'Session expired. Please login again.',
            code: error.code,
            type: error.type
        };
    } else if (error.code === 429) {
        return {
            message: 'Too many attempts. Please try again later.',
            code: error.code,
            type: error.type
        };
    } else if (error.code === 400 && error.type === 'user_already_exists') {
        return {
            message: 'An account with this email already exists.',
            code: error.code,
            type: error.type
        };
    } else if (error.code === 400 && error.type === 'user_invalid_credentials') {
        return {
            message: 'Invalid email or password.',
            code: error.code,
            type: error.type
        };
    }
    
    return {
        message: error.message || 'An unexpected error occurred',
        code: error.code || 500,
        type: error.type || 'unknown_error'
    };
};

// Get current session with automatic refresh
export const getCurrentSession = async () => {
    try {
        const session = await account.get();
        return { data: session, error: null };
    } catch (error: any) {
        console.debug('Session check result:', {
            code: error?.code,
            type: error?.type,
            url: window?.location?.pathname
        });
        
        if (error.code === 401) {
            // Session is invalid or expired
            return { data: null, error: handleError(error) };
        }
        return { data: null, error: handleError(error) };
    }
};

// Email Authentication
export const createAccount = async (email: string, password: string, name: string) => {
    try {
        const response = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Automatically login after successful account creation
        const loginResult = await loginWithEmail(email, password);
        if (loginResult.error) {
            return { data: null, error: loginResult.error };
        }

        return { data: response, error: null };
    } catch (error) {
        return { data: null, error: handleError(error) };
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return { data: session, error: null };
    } catch (error) {
        return { data: null, error: handleError(error) };
    }
};

// Google OAuth
export const loginWithGoogle = async () => {
    try {
        const session = await account.createOAuth2Session(
            'google' as any,
            config.auth.successRedirect,
            config.auth.failureRedirect,
            ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
        );
        return { data: session, error: null };
    } catch (error) {
        return { data: null, error: handleError(error) };
    }
};

// Get user name from session
export const getUserName = async (): Promise<string> => {
    try {
        const { data: session } = await getCurrentSession();
        return session?.name || 'Guest';
    } catch (error) {
        console.error('Error getting username:', error);
        return 'Guest';
    }
};

// Secure logout
export const logout = async () => {
    try {
        // Delete the current session
        await account.deleteSession('current');
        
        // Verify session is deleted
        const { data: session } = await getCurrentSession();
        if (session) {
            console.error('Session still exists after logout attempt');
            return { error: { message: 'Failed to logout properly', code: 500, type: 'logout_failed' } };
        }
        return { error: null };
    } catch (error) {
        return { error: handleError(error) };
    }
};

export { client }; 