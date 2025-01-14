import { Client, Account, Databases, ID } from 'appwrite';
import { config } from './config';

// Initialize Appwrite client
const client = new Client();
client
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Error handling utility
const handleError = (error: any) => {
    console.error('Appwrite error:', error);
    
    // Map Appwrite errors to user-friendly messages
    if (error.code === 401) {
        if (error.type === 'general_unauthorized_scope') {
            throw new Error('Please log in to continue.');
        }
        throw new Error('Session expired. Please login again.');
    } else if (error.code === 429) {
        throw new Error('Too many attempts. Please try again later.');
    } else if (error.code === 400 && error.type === 'user_already_exists') {
        throw new Error('An account with this email already exists.');
    } else if (error.code === 400 && error.type === 'user_invalid_credentials') {
        throw new Error('Invalid email or password.');
    } else {
        throw new Error(error.message || 'An unexpected error occurred');
    }
};

// Get current session with automatic refresh
export const getCurrentSession = async () => {
    try {
        const session = await account.get();
        return session;
    } catch (error: any) {
        if (error.code === 401) {
            // Session is invalid or expired
            return null;
        }
        handleError(error);
        return null;
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
        await loginWithEmail(email, password);

        return response;
    } catch (error) {
        handleError(error);
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        handleError(error);
    }
};

// Google OAuth
export const loginWithGoogle = async () => {
    try {
        return await account.createOAuth2Session(
            'google' as any,
            config.auth.successRedirect,
            config.auth.failureRedirect,
            ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
        );
    } catch (error) {
        handleError(error);
    }
};

// Get user name from session
export const getUserName = async (): Promise<string> => {
    try {
        const session = await getCurrentSession();
        return session?.name || 'Guest';
    } catch (error) {
        handleError(error);
        return 'Guest';
    }
};

// Secure logout
export const logout = async () => {
    try {
        // Delete the current session
        await account.deleteSession('current');
        
        // Verify session is deleted
        const session = await getCurrentSession();
        if (session) {
            throw new Error('Session still exists after logout');
        }
    } catch (error) {
        handleError(error);
    }
};

export { client }; 