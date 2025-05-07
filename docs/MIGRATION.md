# Appwrite to Firebase Migration Guide

This document provides information about the migration from Appwrite to Firebase in the Muslim Companion App.

## Changes Made

1. **Authentication**
   - Migrated user authentication from Appwrite to Firebase Authentication
   - Implemented email/password login, Google OAuth, and session management
   - Updated auth error handling to match Firebase error codes

2. **Database**
   - Migrated from Appwrite Database to Firestore
   - Tasks collection structure was preserved with minimal changes
   - Added new Firestore-specific functionality like batch operations

3. **Configuration**
   - Removed Appwrite configuration files
   - Added Firebase configuration with emulator support for development

## Recent Fixes

If you encounter authentication errors after migration, make sure you've updated all files that directly import from Firebase. The following files needed updates:

1. `contexts/auth-context.tsx`: Changed from using `onAuthStateChanged` directly to using `authService.subscribeToAuthChanges`
2. `hooks/useUser.ts`: Updated to use `authService.getCurrentSession()` instead of direct Firebase methods
3. `app/[locale]/login/page.tsx`: Updated imports and method calls to use the new auth service
4. `app/[locale]/register/page.tsx`: Updated imports and method calls to use the new auth service

Remember to always use the abstracted `authService` from `lib/auth.ts` rather than directly importing from `lib/firebase-auth.ts`.

## Environment Variables

You'll need to update your environment variables. Replace Appwrite variables with Firebase ones:

```
# Remove these Appwrite variables
NEXT_PUBLIC_APPWRITE_ENDPOINT
NEXT_PUBLIC_APPWRITE_PROJECT_ID

# Add these Firebase variables
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Optional for development
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
```

## API Changes

### Authentication

The authentication API remains similar but uses Firebase under the hood:

```typescript
// Creating an account
const result = await authService.createAccount(email, password, name);

// Email login
const result = await authService.loginWithEmail(email, password);

// Google login
const result = await authService.loginWithGoogle();

// Logout
await authService.logout();

// Get current session
const session = await authService.getCurrentSession();

// Subscribe to auth changes
const unsubscribe = authService.subscribeToAuthChanges((session) => {
  if (session) {
    // User is logged in
    console.log('User ID:', session.userId);
  } else {
    // User is logged out
  }
});
```

### Tasks Management

The tasks API maintains compatibility with previous code:

```typescript
// Create a task
const task = await tasksService.createTask({
  userId: 'user123',
  title: 'Morning Prayer',
  category: 'Prayer',
  time: '05:30',
  status: 'upcoming',
  iconName: 'prayer',
  priority: 'high',
  date: '2023-05-15',
});

// Get user tasks for a day
const tasks = await tasksService.getUserDailyTasks('user123', '2023-05-15');

// Update task status
await tasksService.updateTaskStatus('task123', 'completed');
```

## Data Migration

If you need to migrate existing data from Appwrite to Firebase, follow these steps:

1. Export data from Appwrite:
   - Use the Appwrite console or CLI to export your collections

2. Transform the data:
   - Convert document IDs to Firestore format
   - Adjust timestamps if necessary

3. Import to Firestore:
   - Use Firebase Admin SDK to import data
   - Or use the Firestore console for smaller datasets

## Firestore Rules

Update your Firestore security rules to properly secure your data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    // Add rules for other collections here
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Firestore Indexes

When using multiple query conditions with Firestore, you might need to create composite indexes. For optimal performance with tasks queries, create the following indexes in the Firebase console:

1. Navigate to Firebase Console > Firestore Database > Indexes tab
2. Click "Create Index"
3. Create the following indexes:

**For tasks collection:**
- Fields to index:
  - userId (Ascending)
  - date (Ascending)
  - time (Ascending)

**For advanced sorting:**
- Fields to index:
  - userId (Ascending)
  - date (Descending)
  - time (Ascending)

The current implementation includes fallback methods that sort on the client side, but creating these indexes will improve performance and allow for server-side sorting.

## Testing

Make sure to thoroughly test all functionality after migration:

1. User registration and login
2. Task creation and retrieval
3. Task updates and deletions
4. Batch operations

## Development with Emulators

For local development, you can use Firebase emulators:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init emulators`
3. Start emulators: `firebase emulators:start`
4. Set environment variable: `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true`

## Troubleshooting

Common issues and solutions:

- **Firebase Authentication not working**: Check your Firebase console to ensure authentication methods are enabled.
- **Firestore permission denied**: Review your security rules to ensure they allow the necessary operations.
- **Missing data after migration**: Verify that all fields were correctly mapped between Appwrite and Firebase.
- **Authentication errors after migration**: Make sure all files that used the direct Firebase/Appwrite imports are updated to use the abstraction layer.
- **"Loading tasks..." stuck indefinitely**: 
  1. Check browser console for errors 
  2. Verify that user authentication is working correctly
  3. Ensure Firestore rules allow reading tasks with the authenticated user
  4. Create the recommended Firestore indexes mentioned above

For more detailed information about Firebase, refer to the [Firebase documentation](https://firebase.google.com/docs). 