
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
       {
        protocol: 'https' ,
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
   async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
       {
        source: '/apple-touch-icon.png',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
       {
        source: '/favicon-16x16.png',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
       {
        source: '/favicon-32x32.png',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
       {
        source: '/android-chrome-192x192.png',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
       {
        source: '/android-chrome-512x512.png',
        destination: 'https://i.imgur.com/wqfSmsa.png',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
