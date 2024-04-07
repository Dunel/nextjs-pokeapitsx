/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'https://raw.githubusercontent.com',
            }
        ]
    }
};

export default nextConfig;
