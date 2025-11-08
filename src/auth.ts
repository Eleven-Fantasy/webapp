import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { generateWallet, encryptPrivateKey } from "@/lib/wallet";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && account.providerAccountId) {
                try {
                    // Check if user already exists
                    const existingUser = await db
                        .select()
                        .from(users)
                        .where(eq(users.googleId, account.providerAccountId))
                        .limit(1);

                    if (existingUser.length === 0) {
                        // Create new wallet for user
                        const wallet = generateWallet();
                        const encryptedPrivateKey = encryptPrivateKey(
                            wallet.privateKey
                        );

                        // Create new user with wallet
                        await db.insert(users).values({
                            email: user.email || "",
                            name: user.name || null,
                            image: user.image || null,
                            googleId: account.providerAccountId,
                            walletAddress: wallet.address,
                            encryptedPrivateKey: encryptedPrivateKey,
                        });
                    }
                } catch (error) {
                    console.error("Error during sign in:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user?.email) {
                // Fetch user data from database
                const userData = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, session.user.email))
                    .limit(1);

                if (userData.length > 0) {
                    session.user.id = userData[0].id.toString();
                    session.user.walletAddress = userData[0].walletAddress;
                }
            }
            return session;
        },
        async jwt({ token, account, user, profile }) {
            if (account?.providerAccountId) {
                token.googleId = account.providerAccountId;
            }
            return token;
        },
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth } = NextAuth(authOptions);
