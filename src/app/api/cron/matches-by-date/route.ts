import axios from "axios";
import { db } from "@/app/db/drizzle";
import { upcomingMatches } from "@/app/db/schema";
import { eq } from "drizzle-orm";

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
    date: string;
    completed: boolean;
    [key: string]: unknown;
}

interface ScheduleResponse {
    schedule: {
        [dateKey: string]: Match[];
    };
}

export async function GET() {
    const now = new Date();
    const year = String(now.getFullYear());
    // JS months are 0-based, add 1 and pad to 2 digits
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const options = {
        method: "GET",
        url: "https://english-premiere-league1.p.rapidapi.com/schedule",
        params: {
            year,
            month,
            day,
        },
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "english-premiere-league1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request<ScheduleResponse>(options);
        const data = response.data;

        if (!data?.schedule) {
            return Response.json(
                { error: "Invalid API response format" },
                { status: 400 }
            );
        }

        // Get all date keys and skip the first one (previous date)
        const dateKeys = Object.keys(data.schedule).sort();
        if (dateKeys.length === 0) {
            return Response.json({ message: "No matches found" });
        }

        // Skip the first date as it's the previous date
        const upcomingDateKeys = dateKeys.slice(1);
        let totalInserted = 0;
        let totalUpdated = 0;
        const datesProcessed: {
            [dateKey: string]: { inserted: number; updated: number };
        } = {};

        // Process each upcoming date
        for (const dateKey of upcomingDateKeys) {
            const matches = data.schedule[dateKey] || [];
            let dateInserted = 0;
            let dateUpdated = 0;

            for (const match of matches) {
                // Only process upcoming matches (not completed)
                if (match.completed) {
                    continue;
                }

                // Find home and away teams
                const homeTeam = match.competitors.find((c) => c.isHome);
                const awayTeam = match.competitors.find((c) => !c.isHome);

                if (!homeTeam || !awayTeam) {
                    console.warn(`Match ${match.id} missing home or away team`);
                    continue;
                }

                // Parse the date
                const matchDate = new Date(match.date);
                if (isNaN(matchDate.getTime())) {
                    console.warn(
                        `Invalid date for match ${match.id}: ${match.date}`
                    );
                    continue;
                }

                // Extract time (HH:MM format)
                const hours = String(matchDate.getUTCHours()).padStart(2, "0");
                const minutes = String(matchDate.getUTCMinutes()).padStart(
                    2,
                    "0"
                );
                const matchTime = `${hours}:${minutes}`;

                const matchToStore = {
                    externalMatchId: match.id,
                    homeTeam: homeTeam.displayName,
                    awayTeam: awayTeam.displayName,
                    homeLogo: homeTeam.logo || null,
                    awayLogo: awayTeam.logo || null,
                    matchDate,
                    matchTime,
                    apiData: match as unknown,
                };

                try {
                    // Check if match already exists
                    const existing = await db
                        .select()
                        .from(upcomingMatches)
                        .where(
                            eq(
                                upcomingMatches.externalMatchId,
                                matchToStore.externalMatchId
                            )
                        )
                        .limit(1);

                    if (existing.length > 0) {
                        // Update existing match
                        await db
                            .update(upcomingMatches)
                            .set({
                                homeTeam: matchToStore.homeTeam,
                                awayTeam: matchToStore.awayTeam,
                                homeLogo: matchToStore.homeLogo,
                                awayLogo: matchToStore.awayLogo,
                                matchDate: matchToStore.matchDate,
                                matchTime: matchToStore.matchTime,
                                apiData: matchToStore.apiData,
                                updatedAt: new Date(),
                            })
                            .where(
                                eq(
                                    upcomingMatches.externalMatchId,
                                    matchToStore.externalMatchId
                                )
                            );

                        dateUpdated++;
                        totalUpdated++;
                    } else {
                        // Insert new match
                        await db.insert(upcomingMatches).values(matchToStore);
                        dateInserted++;
                        totalInserted++;
                    }
                } catch (error) {
                    console.error(
                        `Error storing match ${matchToStore.externalMatchId}:`,
                        error
                    );
                }
            }

            datesProcessed[dateKey] = {
                inserted: dateInserted,
                updated: dateUpdated,
            };
        }

        return Response.json({
            message: "Matches processed successfully by date",
            datesProcessed,
            totals: {
                inserted: totalInserted,
                updated: totalUpdated,
                dates: Object.keys(datesProcessed).length,
            },
        });
    } catch (error) {
        console.error("Error fetching or storing matches:", error);
        return Response.json(
            {
                error: "Failed to process matches",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
