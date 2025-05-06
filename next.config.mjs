import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    _next_intl_trailing_slash: '1'
  },
  // Add transpilation for Firebase dependencies
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      include: [
        /node_modules\/@firebase/,
        /node_modules\/firebase/,
        /node_modules\/undici/
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
        }
      }
    });
    
    return config;
  }
};

const configWithPWA = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline',
  },
})(nextConfig);

export default withNextIntl(configWithPWA);