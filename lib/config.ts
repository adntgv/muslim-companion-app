const isProd = process.env.NODE_ENV === 'production';
const appUrl = isProd ? process.env.NEXT_PUBLIC_APP_URL : 'http://localhost:3000';

export const config = {
    socialLinks: {
        telegram: 'https://t.me/iqra_app',
        twitter: 'https://twitter.com/your_twitter',
        github: 'https://github.com/your_github',
      },
      app: {
        name: 'Falah',
        description: 'Your personal companion for daily Islamic practices',
        url: appUrl,
      },
      auth: {
        successRedirect: `${appUrl}/dashboard`,
        failureRedirect: `${appUrl}/login`,
        sessionExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        refreshInterval: 60 * 60 * 1000, // 1 hour in milliseconds
      },
      firebase: {
        emulators: {
          useEmulators: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true',
          authUrl: 'http://localhost:9099',
          firestoreHost: 'localhost',
          firestorePort: 8080,
          storageHost: 'localhost',
          storagePort: 9199
        }
      }
    // Add other configuration items here
  };