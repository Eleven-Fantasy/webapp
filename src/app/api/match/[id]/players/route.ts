import { db } from "@/app/db/drizzle";
import { upcomingMatches } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import axios from "axios";

interface Competitor {
    id: string;
    displayName: string;
    logo: string;
    isHome: boolean;
    shortDisplayName: string;
}

interface Match {
    id: string;
    competitors: Competitor[];
    [key: string]: unknown;
}

interface Player {
    id: string;
    displayName: string;
    jersey: string;
    position: {
        displayName: string;
        abbreviation: string;
    };
    statistics?: {
        splits: {
            categories: Array<{
                name: string;
                stats: Array<{
                    name: string;
                    value: number;
                    displayValue: string;
                }>;
            }>;
        };
    };
    teamId: string;
    teamName: string;
    isHome: boolean;
    headshot: string;
}

interface Link {
    rel: string;
    href: string;
    [key: string]: unknown;
}

interface AthleteWithExtendedFields {
    id: string;
    displayName: string;
    jersey: string;
    position: {
        displayName: string;
        abbreviation: string;
    };
    headshot?:
        | {
              href: string;
          }
        | string;
    headshotUrl?: string;
    image?: string;
    imageUrl?: string;
    photo?: string;
    photoUrl?: string;
    picture?: string;
    pictureUrl?: string;
    avatar?: string;
    avatarUrl?: string;
    links?: Link[];
    [key: string]: unknown; // Allow for additional fields
    statistics?: {
        splits: {
            categories: Array<{
                name: string;
                stats: Array<{
                    name: string;
                    value: number;
                    displayValue: string;
                }>;
            }>;
        };
    };
}

interface RosterResponse {
    status: string;
    athletes: Array<AthleteWithExtendedFields>;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: matchId } = await params;

        // Try to query by internal ID first (if numeric), then by externalMatchId
        const isNumericId = !isNaN(Number(matchId));

        let matches;
        if (isNumericId) {
            // Try by internal database ID first
            matches = await db
                .select()
                .from(upcomingMatches)
                .where(eq(upcomingMatches.id, Number(matchId)))
                .limit(1);

            // If not found, try by externalMatchId
            if (matches.length === 0) {
                matches = await db
                    .select()
                    .from(upcomingMatches)
                    .where(eq(upcomingMatches.externalMatchId, matchId))
                    .limit(1);
            }
        } else {
            // Query by externalMatchId
            matches = await db
                .select()
                .from(upcomingMatches)
                .where(eq(upcomingMatches.externalMatchId, matchId))
                .limit(1);
        }

        if (matches.length === 0) {
            return Response.json({ error: "Match not found" }, { status: 404 });
        }

        const match = matches[0];
        const apiData = match.apiData as Match | null;

        if (!apiData || !apiData.competitors) {
            return Response.json(
                { error: "Match data incomplete" },
                { status: 400 }
            );
        }

        // Find home and away teams
        const homeTeam = apiData.competitors.find((c) => c.isHome);
        const awayTeam = apiData.competitors.find((c) => !c.isHome);

        if (!homeTeam || !awayTeam) {
            return Response.json(
                { error: "Team information not found" },
                { status: 400 }
            );
        }

        // Fetch rosters for both teams
        const [homeRosterResponse, awayRosterResponse] = await Promise.all([
            axios.get<RosterResponse>(
                `https://english-premiere-league1.p.rapidapi.com/team/roster?teamId=${homeTeam.id}`,
                {
                    headers: {
                        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                        "x-rapidapi-host":
                            "english-premiere-league1.p.rapidapi.com",
                    },
                }
            ),
            axios.get<RosterResponse>(
                `https://english-premiere-league1.p.rapidapi.com/team/roster?teamId=${awayTeam.id}`,
                {
                    headers: {
                        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                        "x-rapidapi-host":
                            "english-premiere-league1.p.rapidapi.com",
                    },
                }
            ),
        ]);

        // Transform players and add team information
        const homePlayers: Player[] =
            homeRosterResponse.data.athletes?.map((athlete) => {
                // Try to get image from API response - check multiple possible field names
                const athleteExtended = athlete as AthleteWithExtendedFields;
                const headshotUrl =
                    (typeof athlete.headshot === "object" &&
                        athlete.headshot?.href) ||
                    (typeof athlete.headshot === "string"
                        ? athlete.headshot
                        : undefined) ||
                    athleteExtended.headshotUrl ||
                    athleteExtended.image ||
                    athleteExtended.imageUrl ||
                    athleteExtended.photo ||
                    athleteExtended.photoUrl ||
                    athleteExtended.picture ||
                    athleteExtended.pictureUrl ||
                    athleteExtended.avatar ||
                    athleteExtended.avatarUrl ||
                    // Check if there's a links array with image
                    (athleteExtended.links &&
                        Array.isArray(athleteExtended.links) &&
                        athleteExtended.links.find(
                            (link: Link) =>
                                link.rel === "headshot" ||
                                link.rel === "image" ||
                                link.rel === "photo"
                        )?.href) ||
                    // Fallback to constructed URL
                    `https://a.espncdn.com/i/headshots/soccer/players/full/${athlete.id}.png`;

                return {
                    id: athlete.id,
                    displayName: athlete.displayName,
                    jersey: athlete.jersey || "",
                    position: athlete.position,
                    statistics: athlete.statistics,
                    teamId: homeTeam.id,
                    teamName: homeTeam.shortDisplayName || homeTeam.displayName,
                    isHome: true,
                    headshot: headshotUrl,
                };
            }) || [];

        const awayPlayers: Player[] =
            awayRosterResponse.data.athletes?.map((athlete) => {
                // Try to get image from API response - check multiple possible field names
                const athleteExtended = athlete as AthleteWithExtendedFields;
                const headshotUrl =
                    (typeof athlete.headshot === "object" &&
                        athlete.headshot?.href) ||
                    (typeof athlete.headshot === "string"
                        ? athlete.headshot
                        : undefined) ||
                    athleteExtended.headshotUrl ||
                    athleteExtended.image ||
                    athleteExtended.imageUrl ||
                    athleteExtended.photo ||
                    athleteExtended.photoUrl ||
                    athleteExtended.picture ||
                    athleteExtended.pictureUrl ||
                    athleteExtended.avatar ||
                    athleteExtended.avatarUrl ||
                    // Check if there's a links array with image
                    (athleteExtended.links &&
                        Array.isArray(athleteExtended.links) &&
                        athleteExtended.links.find(
                            (link: Link) =>
                                link.rel === "headshot" ||
                                link.rel === "image" ||
                                link.rel === "photo"
                        )?.href) ||
                    // Fallback to constructed URL
                    `https://a.espncdn.com/i/headshots/soccer/players/full/${athlete.id}.png`;

                return {
                    id: athlete.id,
                    displayName: athlete.displayName,
                    jersey: athlete.jersey || "",
                    position: athlete.position,
                    statistics: athlete.statistics,
                    teamId: awayTeam.id,
                    teamName: awayTeam.shortDisplayName || awayTeam.displayName,
                    isHome: false,
                    headshot: headshotUrl,
                };
            }) || [];

        // Combine players from both teams
        const allPlayers = [...homePlayers, ...awayPlayers];

        // Calculate rating and form for each player
        const playersWithStats = allPlayers.map((player) => {
            let rating = 0;
            let form = 0;

            if (player.statistics?.splits?.categories) {
                const generalStats = player.statistics.splits.categories.find(
                    (cat) => cat.name === "general"
                );
                const offensiveStats = player.statistics.splits.categories.find(
                    (cat) => cat.name === "offensive"
                );
                const goalkeepingStats =
                    player.statistics.splits.categories.find(
                        (cat) => cat.name === "goalKeeping"
                    );

                // Calculate a simple rating based on key stats
                const appearances =
                    generalStats?.stats.find((s) => s.name === "appearances")
                        ?.value || 0;
                const goals =
                    offensiveStats?.stats.find((s) => s.name === "totalGoals")
                        ?.value || 0;
                const assists =
                    offensiveStats?.stats.find((s) => s.name === "goalAssists")
                        ?.value || 0;
                const saves =
                    goalkeepingStats?.stats.find((s) => s.name === "saves")
                        ?.value || 0;

                // Simple rating calculation (can be improved)
                if (appearances > 0) {
                    rating = Math.round(
                        ((goals * 3 + assists * 2 + saves * 0.5) /
                            appearances) *
                            10
                    );
                }

                // Form: last 5 appearances performance (simplified - using overall stats)
                form = Math.min(10, Math.max(0, rating));
            }

            return {
                ...player,
                rating: rating || 0,
                form: form || 0,
            };
        });

        return Response.json({
            players: playersWithStats,
            homeTeam: homeTeam.shortDisplayName || homeTeam.displayName,
            awayTeam: awayTeam.shortDisplayName || awayTeam.displayName,
        });
    } catch (error) {
        console.error("Error fetching players:", error);
        return Response.json(
            {
                error: "Failed to fetch players",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
