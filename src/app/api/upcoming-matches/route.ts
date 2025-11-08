import { db } from "@/app/db/drizzle";
import { upcomingMatches } from "@/app/db/schema";
import { gte } from "drizzle-orm";

interface Competitor {
    id: string;
    displayName: string;
    shortDisplayName: string;
    logo: string;
    isHome: boolean;
}

interface MatchApiData {
    competitors?: Competitor[];
    [key: string]: unknown;
}

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
        const formattedMatches = matches.map((match) => {
            const apiData = match.apiData as MatchApiData | null;

            // Try to get short names from apiData, fallback to database values
            let homeTeamName = match.homeTeam;
            let awayTeamName = match.awayTeam;

            if (apiData?.competitors) {
                const homeTeam = apiData.competitors.find((c) => c.isHome);
                const awayTeam = apiData.competitors.find((c) => !c.isHome);
                if (homeTeam) {
                    homeTeamName =
                        homeTeam.shortDisplayName || homeTeam.displayName;
                }
                if (awayTeam) {
                    awayTeamName =
                        awayTeam.shortDisplayName || awayTeam.displayName;
                }
            }

            return {
                id: match.id,
                externalMatchId: match.externalMatchId,
                home: homeTeamName,
                away: awayTeamName,
                homeLogo: match.homeLogo || "",
                awayLogo: match.awayLogo || "",
                time: match.matchTime || "",
                matchDate:
                    match.matchDate instanceof Date
                        ? match.matchDate.toISOString()
                        : match.matchDate,
            };
        });

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
