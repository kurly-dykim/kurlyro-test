/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/.well-known/apple-app-site-association",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/json",
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ],
            }
        ]
    }
};

export default nextConfig;
