/**
 * Utilities for grouping matches into matchweeks
 */

export interface Matchweek {
    number: number;
    startDate: Date;
    endDate: Date;
    dateKeys: string[];
}

/**
 * Gets the EPL season start date for a given year
 * EPL seasons typically start in mid-August
 * 2024-25 season started: August 17, 2024
 * 2025-26 season will start: around August 16, 2025 (estimate)
 */
function getSeasonStartDate(year: number): Date {
    // Known season start dates
    const seasonStarts: { [key: number]: Date } = {
        2024: new Date(2024, 7, 17), // August 17, 2024 (0-indexed month)
        2025: new Date(2025, 7, 16), // August 16, 2025 (estimate)
    };

    // If we have a known date, use it
    if (seasonStarts[year]) {
        return seasonStarts[year];
    }

    // Otherwise, estimate: second Saturday in August
    const august = new Date(year, 7, 17); // Month is 0-indexed, so 7 = August
    const dayOfWeek = august.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    august.setDate(
        august.getDate() + (daysUntilSaturday === 0 ? 0 : daysUntilSaturday)
    );

    return august;
}

/**
 * Determines which season a match date belongs to
 * EPL seasons run from August to May of the following year
 */
function getSeasonForDate(matchDate: Date): { year: number; startDate: Date } {
    const year = matchDate.getFullYear();
    const month = matchDate.getMonth(); // 0-indexed

    // If match is between August (7) and December (11), it's the current year's season
    // If match is between January (0) and May (4), it's the previous year's season
    let seasonYear = year;
    if (month < 7) {
        // Before August
        seasonYear = year - 1;
    }

    return {
        year: seasonYear,
        startDate: getSeasonStartDate(seasonYear),
    };
}

/**
 * Calculates the EPL matchweek number based on the match date
 * Matchweeks are numbered starting from 1 based on weeks from season start
 */
function calculateEPLMatchweekNumber(matchDate: Date): number {
    const { startDate } = getSeasonForDate(matchDate);

    // Calculate weeks since season start
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksSinceStart = Math.floor(
        (matchDate.getTime() - startDate.getTime()) / millisecondsPerWeek
    );

    // Matchweek starts at 1, not 0
    // Add 1 because the first week is matchweek 1
    return Math.max(1, weeksSinceStart + 1);
}

/**
 * Groups sorted date keys into matchweeks with actual EPL matchweek numbers
 * A matchweek typically spans from Friday to the following Sunday/Monday (7-10 days)
 */
export function groupDatesIntoMatchweeks(
    sortedDateKeys: string[]
): Matchweek[] {
    if (sortedDateKeys.length === 0) {
        return [];
    }

    const matchweeks: Matchweek[] = [];
    let currentMatchweek: string[] = [];
    let matchweekStartDate: Date | null = null;

    for (const dateKey of sortedDateKeys) {
        const date = new Date(dateKey);

        // If this is the first date, start a new matchweek
        if (currentMatchweek.length === 0) {
            currentMatchweek.push(dateKey);
            matchweekStartDate = date;
            continue;
        }

        // Calculate days difference from matchweek start
        const daysDiff =
            Math.floor(
                (date.getTime() - matchweekStartDate!.getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        // If we're within 10 days of the start, add to current matchweek
        // This allows for weekends spanning into the next week
        if (daysDiff <= 10) {
            currentMatchweek.push(dateKey);
        } else {
            // Start a new matchweek
            if (currentMatchweek.length > 0 && matchweekStartDate) {
                const matchweekNumber =
                    calculateEPLMatchweekNumber(matchweekStartDate);
                matchweeks.push({
                    number: matchweekNumber,
                    startDate: new Date(currentMatchweek[0]),
                    endDate: new Date(
                        currentMatchweek[currentMatchweek.length - 1]
                    ),
                    dateKeys: [...currentMatchweek],
                });
            }
            currentMatchweek = [dateKey];
            matchweekStartDate = date;
        }
    }

    // Add the last matchweek
    if (currentMatchweek.length > 0 && matchweekStartDate) {
        const matchweekNumber = calculateEPLMatchweekNumber(matchweekStartDate);
        matchweeks.push({
            number: matchweekNumber,
            startDate: new Date(currentMatchweek[0]),
            endDate: new Date(currentMatchweek[currentMatchweek.length - 1]),
            dateKeys: [...currentMatchweek],
        });
    }

    return matchweeks;
}

/**
 * Formats a date range for display (e.g., "Fri 3 Oct - Sun 5 Oct")
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const formatDate = (date: Date): string => {
        return `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
        }`;
    };

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    // If same date, just return it once
    if (start === end) {
        return start;
    }

    return `${start} - ${end}`;
}
