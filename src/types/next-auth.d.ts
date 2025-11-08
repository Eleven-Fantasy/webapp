import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            walletAddress?: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        image?: string | null;
        walletAddress?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        googleId?: string;
        walletAddress?: string;
    }
}
