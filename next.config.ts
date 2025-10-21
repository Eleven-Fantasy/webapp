import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // Enable external access for port forwarding
    experimental: {
        serverComponentsExternalPackages: [],
    },
};

export default nextConfig;
