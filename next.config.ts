import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // Enable external access for port forwarding
    serverExternalPackages: [],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a.espncdn.com",
            },
        ],
    },
};

export default nextConfig;
