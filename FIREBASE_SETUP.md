# Firebase Setup Guide

This guide will help you set up Firebase for authentication and storage in your Muslim Companion App.

## Prerequisites

1. A Google account
2. The Firebase CLI installed locally (`npm install -g firebase-tools`)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a name for your project (e.g., "Muslim Companion App")
4. Follow the setup steps (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Set Up Firebase Authentication

1. In the Firebase console, go to your project
2. In the left sidebar, click "Authentication"
3. Click "Get started"
4. Enable the "Email/Password" provider
5. (Optional) Enable Google authentication or other providers as needed
6. Save your changes

## Step 3: Create a Firestore Database

1. In the Firebase console, go to your project
2. In the left sidebar, click "Firestore Database"
3. Click "Create database"
4. Start in production mode or test mode as needed
5. Choose a location for your database (select the region closest to your users)
6. Click "Enable"

## Step 4: Set Up Firestore Security Rules

1. In the Firestore Database section, click on the "Rules" tab
2. Update your rules to something like:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Step 5: Register a Web App

1. In your Firebase project dashboard, click on the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" and click the web icon "</>"
4. Register your app with a name (e.g., "Muslim Companion Web")
5. You can skip the "Firebase Hosting" setup for now
6. You'll see your Firebase configuration - you'll need this for the next step

## Step 6: Add Firebase Config to Environment Variables

Create a `.env.local` file in the root of your project and add the following variables with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 7: Initialize Firebase in Your Project

The Firebase initialization is now set up in the codebase. The main configuration file is at `lib/firebase.ts`.

## Step 8: Deploy and Test

1. Restart your development server
2. Test the authentication flow by registering a new user
3. Test Firebase storage by creating and retrieving tasks

## Using Firebase Emulators (Optional)

For local development, you can use Firebase emulators:

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
   - Select Firestore and Authentication emulators
4. Start the emulators: `firebase emulators:start`
5. Set the environment variable in your `.env.local` file:
   ```
   NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
   ```

## Troubleshooting

- If authentication is not working, check the Firebase Authentication console to ensure your authentication methods are properly enabled.
- For Firestore issues, check your security rules to ensure they allow the necessary access patterns.
- Console errors often provide helpful information about what's going wrong with Firebase services. 