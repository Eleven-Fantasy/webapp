"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import type { Matchweek } from "@/utils/matchweeks";

interface Match {
    id: number;
    externalMatchId: string;
    home: string;
    away: string;
    homeLogo: string;
    awayLogo: string;
    time: string;
    matchDate: string;
}

interface MatchWeekProps {
    selectedMatchweek: Matchweek | null;
    schedule: {
        [dateKey: string]: Match[];
    };
}

const MatchWeek = ({ selectedMatchweek, schedule }: MatchWeekProps) => {
    const router = useRouter();

    // Filter schedule to only show dates in the selected matchweek
    const filteredSchedule = useMemo(() => {
        if (!selectedMatchweek) {
            return {};
        }

        const filtered: { [dateKey: string]: Match[] } = {};
        for (const dateKey of selectedMatchweek.dateKeys) {
            if (schedule[dateKey]) {
                filtered[dateKey] = schedule[dateKey];
            }
        }
        return filtered;
    }, [selectedMatchweek, schedule]);

    // Format date for display (e.g., "Sat 18 Oct")
    const formatDate = (dateKey: string): string => {
        const date = new Date(dateKey);
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
        return `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
        }`;
    };

    // Sort date keys chronologically
    const sortedDates = Object.keys(filteredSchedule).sort();

    if (!selectedMatchweek) {
        return (
            <div className="content w-full p-[1rem] rounded-[5px] flex flex-col gap-2">
                <div className="flex justify-center items-center py-8">
                    <p className="text-[12px] text-gray-500">
                        Loading matches...
                    </p>
                </div>
            </div>
        );
    }

    if (sortedDates.length === 0) {
        return (
            <div className="content w-full p-[1rem] rounded-[5px] flex flex-col gap-2">
                <div className="flex justify-center items-center py-8">
                    <p className="text-[12px] text-gray-500">
                        No matches for this matchweek
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="content w-full p-[1rem] rounded-[5px] flex flex-col gap-2">
            {sortedDates.map((dateKey, dateIndex) => (
                <div key={dateKey} className={dateIndex > 0 ? "mt-4" : ""}>
                    <p className="text-[11px] font-[700]">
                        {formatDate(dateKey)}
                    </p>
                    <div className="matches flex flex-col gap-5">
                        {filteredSchedule[dateKey].map((match) => (
                            <div
                                key={match.id}
                                onClick={() =>
                                    router.push(
                                        `/match-details?id=${match.externalMatchId}`
                                    )
                                }
                                className="cursor-pointer"
                            >
                                <div className="match flex gap-[0.5rem] items-center justify-center text-[11px] font-[500] font-satoshi">
                                    <div className="flex-[1] flex justify-end items-center gap-1">
                                        <p>{match.home}</p>
                                        {match.homeLogo && (
                                            <Image
                                                width={20}
                                                height={20}
                                                src={match.homeLogo}
                                                alt={`${match.home} logo`}
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/images/team-logo/forest.png";
                                                }}
                                            />
                                        )}
                                    </div>
                                    <p className="w-[2rem] text-center text-[10px] font-[700]">
                                        {match.time}
                                    </p>
                                    <div className="flex-[1] flex items-center justify-start gap-1">
                                        {match.awayLogo && (
                                            <Image
                                                width={20}
                                                height={20}
                                                src={match.awayLogo}
                                                alt={`${match.away} logo`}
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/images/team-logo/chelsea.png";
                                                }}
                                            />
                                        )}
                                        <p>{match.away}</p>
                                    </div>
                                </div>
                                <div className="w-[70%] mx-auto mt-5 border-b border-secondary/10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MatchWeek;
