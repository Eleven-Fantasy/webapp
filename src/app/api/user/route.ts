import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const user = await getCurrentUser();

    if (!user?.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await db
        .select({
            id: users.id,
            email: users.email,
            name: users.name,
            image: users.image,
            walletAddress: users.walletAddress,
            createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

    if (userData.length === 0) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(userData[0]);
}
