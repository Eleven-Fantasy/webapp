import { db } from "@/app/db/drizzle";
import { userPoints } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// GET /api/points?wallet=0x...
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    // Demo fallback when no wallet provided
    if (!wallet) {
        return Response.json(567846);
    }

    const rows = await db
        .select()
        .from(userPoints)
        .where(eq(userPoints.walletAddress, wallet))
        .limit(1);

    const points = rows[0]?.points ?? 0;
    return Response.json(points);
}

// POST /api/points?wallet=0x...  { delta?: number, set?: number }
export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
        return Response.json({ error: "wallet is required" }, { status: 400 });
    }

    const body = (await request.json()) as {
        delta?: number;
        set?: number;
    };

    // Read current
    const existing = await db
        .select()
        .from(userPoints)
        .where(eq(userPoints.walletAddress, wallet))
        .limit(1);

    const current = existing[0]?.points ?? 0;
    const next =
        typeof body.set === "number"
            ? Math.max(0, Math.floor(body.set))
            : Math.max(0, Math.floor(current + (body.delta ?? 0)));

    if (existing.length === 0) {
        await db
            .insert(userPoints)
            .values({ walletAddress: wallet, points: next });
    } else {
        await db
            .update(userPoints)
            .set({ points: next, updatedAt: new Date() })
            .where(eq(userPoints.walletAddress, wallet));
    }

    return Response.json(next);
}
