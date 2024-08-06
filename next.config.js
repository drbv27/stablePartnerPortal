/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'marketplace.y5b0.la.idrivee2-24.com',
            },
            {
                protocol: 'https',
                hostname: 'api.nevtis.com',
            },

        ],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
