import { db } from "@/app/db/drizzle";
import { upcomingMatches } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: matchId } = await params;

        // Query match from the database by externalMatchId
        const matches = await db
            .select()
            .from(upcomingMatches)
            .where(eq(upcomingMatches.externalMatchId, matchId))
            .limit(1);

        if (matches.length === 0) {
            return Response.json({ error: "Match not found" }, { status: 404 });
        }

        const match = matches[0];

        // Transform database record to match the expected frontend format
        const formattedMatch = {
            id: match.id,
            externalMatchId: match.externalMatchId,
            home: match.homeTeam,
            away: match.awayTeam,
            homeLogo: match.homeLogo || "",
            awayLogo: match.awayLogo || "",
            time: match.matchTime || "",
            matchDate:
                match.matchDate instanceof Date
                    ? match.matchDate.toISOString()
                    : match.matchDate,
            apiData: match.apiData,
        };

        return Response.json(formattedMatch);
    } catch (error) {
        console.error("Error fetching match:", error);
        return Response.json(
            {
                error: "Failed to fetch match",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
