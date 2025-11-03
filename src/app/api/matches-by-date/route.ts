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

        // Group matches by date
        const matchesByDate: { [dateKey: string]: typeof formattedMatches } =
            {};

        for (const match of formattedMatches) {
            const matchDate = new Date(match.matchDate);
            // Create date key in YYYY-MM-DD format
            const dateKey = matchDate.toISOString().split("T")[0];

            if (!matchesByDate[dateKey]) {
                matchesByDate[dateKey] = [];
            }

            matchesByDate[dateKey].push(match);
        }

        return Response.json({
            schedule: matchesByDate,
        });
    } catch (error) {
        console.error("Error fetching matches by date:", error);
        return Response.json(
            {
                error: "Failed to fetch matches by date",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
