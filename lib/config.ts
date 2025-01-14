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
      appwrite: {
        endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.adntgv.com/v1',
        projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '67852f14003b2e275a82',
      }
    // Add other configuration items here
  };