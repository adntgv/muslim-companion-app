import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline',
    },
  })({
    // your existing Next.js config
  });
  
 
export default withNextIntl(nextConfig);