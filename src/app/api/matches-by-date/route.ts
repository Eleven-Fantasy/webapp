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
