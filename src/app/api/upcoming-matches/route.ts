import { db } from "@/app/db/drizzle";
import { upcomingMatches } from "@/app/db/schema";
import { gte } from "drizzle-orm";

export async function GET() {
    try {
        const now = new Date();

        // Query upcoming matches from the database (matchDate >= now)
        const matches = await db
            .select()
            .from(upcomingMatches)
            .where(gte(upcomingMatches.matchDate, now))
            .orderBy(upcomingMatches.matchDate);

        // Transform database records to match the expected frontend format
        const formattedMatches = matches.map((match) => ({
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
        }));

        return Response.json(formattedMatches);
    } catch (error) {
        console.error("Error fetching upcoming matches:", error);
        return Response.json(
            {
                error: "Failed to fetch upcoming matches",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
