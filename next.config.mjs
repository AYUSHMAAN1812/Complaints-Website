import nextPwa from 'next-pwa';

const nextConfig = nextPwa({
    reactStrictMode: true,
    experimental: {
        appDir: true,  // Ensure App Router works properly
    },
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
});

export default nextConfig;
