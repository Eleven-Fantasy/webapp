import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // Enable external access for port forwarding
    serverExternalPackages: [],
    images: {
        domains: ["a.espncdn.com"],
    },
};

export default nextConfig;
