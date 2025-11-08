import { db } from "@/app/db/drizzle";
import { userPoints } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// GET /api/points - uses authenticated user's wallet
export async function GET() {
    const user = await getCurrentUser();

    if (!user?.walletAddress) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
        .select()
        .from(userPoints)
        .where(eq(userPoints.walletAddress, user.walletAddress))
        .limit(1);

    const points = rows[0]?.points ?? 0;
    return Response.json(points);
}

// POST /api/points  { delta?: number, set?: number } - uses authenticated user's wallet
export async function POST(request: NextRequest) {
    const user = await getCurrentUser();

    if (!user?.walletAddress) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
        delta?: number;
        set?: number;
    };

    // Read current
    const existing = await db
        .select()
        .from(userPoints)
        .where(eq(userPoints.walletAddress, user.walletAddress))
        .limit(1);

    const current = existing[0]?.points ?? 0;
    const next =
        typeof body.set === "number"
            ? Math.max(0, Math.floor(body.set))
            : Math.max(0, Math.floor(current + (body.delta ?? 0)));

    if (existing.length === 0) {
        await db
            .insert(userPoints)
            .values({ walletAddress: user.walletAddress, points: next });
    } else {
        await db
            .update(userPoints)
            .set({ points: next, updatedAt: new Date() })
            .where(eq(userPoints.walletAddress, user.walletAddress));
    }

    return Response.json(next);
}
