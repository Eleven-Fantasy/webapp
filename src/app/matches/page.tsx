"use client";
import MainHeader from "@/components/MainHeader";
import MatchWeek from "@/components/MatchWeek";
import Tabs from "@/components/Tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
    formatDateRange,
    groupDatesIntoMatchweeks,
    type Matchweek,
} from "@/utils/matchweeks";

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

interface ScheduleResponse {
    schedule: {
        [dateKey: string]: Match[];
    };
}

const fetchMatchesByDate = async (): Promise<ScheduleResponse> => {
    const response = await axios.get<ScheduleResponse>("/api/matches-by-date");
    return response.data;
};

const MatchesPage = () => {
    const [currentMatchweekIndex, setCurrentMatchweekIndex] = useState(0);

    const { data } = useQuery({
        queryKey: ["matches-by-date"],
        queryFn: fetchMatchesByDate,
    });

    // Group dates into matchweeks
    const matchweeks = useMemo(() => {
        if (!data?.schedule) return [];
        const sortedDates = Object.keys(data.schedule).sort();
        return groupDatesIntoMatchweeks(sortedDates);
    }, [data]);

    // Reset index if out of bounds when matchweeks change
    useEffect(() => {
        if (
            matchweeks.length > 0 &&
            currentMatchweekIndex >= matchweeks.length
        ) {
            setCurrentMatchweekIndex(0);
        }
    }, [matchweeks.length, currentMatchweekIndex]);

    const currentMatchweek: Matchweek | null =
        matchweeks[currentMatchweekIndex] || null;

    const handlePrevious = () => {
        if (currentMatchweekIndex > 0) {
            setCurrentMatchweekIndex(currentMatchweekIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentMatchweekIndex < matchweeks.length - 1) {
            setCurrentMatchweekIndex(currentMatchweekIndex + 1);
        }
    };

    return (
        <div className="w-full h-full pb-[4rem]">
            <MainHeader />
            <div className="flex flex-col gap-5 px-[1rem] pb-[4rem] overflow-y-auto">
                <div className="matchweek-navigator-cont flex items-center gap-4 mx-auto w-[70%] justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentMatchweekIndex === 0}
                        aria-label="Previous Matchweek"
                        className={
                            currentMatchweekIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        }
                    >
                        <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="29"
                                y="29"
                                width="29"
                                height="29"
                                rx="14.5"
                                transform="rotate(-180 29 29)"
                                fill="#F1EEF4"
                            />
                            <g clipPath="url(#clip0_61_245)">
                                <path
                                    d="M16 10.6L11.8 14.5L16 18.4"
                                    stroke="#070707"
                                    strokeLinecap="square"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_61_245">
                                    <rect
                                        width="9"
                                        height="9"
                                        fill="white"
                                        transform="translate(19 19) rotate(-180)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <div>
                        <p className="text-[17px] font-[700] leading-none">
                            {currentMatchweek
                                ? `Matchweek ${currentMatchweek.number}`
                                : "Loading..."}
                        </p>
                        <p className="text-[9px] font-[500]">
                            {currentMatchweek
                                ? formatDateRange(
                                      currentMatchweek.startDate,
                                      currentMatchweek.endDate
                                  )
                                : ""}
                        </p>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={
                            currentMatchweekIndex >= matchweeks.length - 1
                        }
                        aria-label="Next Matchweek"
                        className={
                            currentMatchweekIndex >= matchweeks.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        }
                    >
                        <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="29"
                                height="29"
                                rx="14.5"
                                fill="#F1EEF4"
                            />
                            <g clipPath="url(#clip0_61_248)">
                                <path
                                    d="M13 18.4L17.2 14.5L13 10.6"
                                    stroke="#070707"
                                    strokeLinecap="square"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_61_248">
                                    <rect
                                        width="9"
                                        height="9"
                                        fill="white"
                                        transform="translate(10 10)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>

                <MatchWeek
                    selectedMatchweek={currentMatchweek}
                    schedule={data?.schedule || {}}
                />
            </div>
            <Tabs />
        </div>
    );
};

export default MatchesPage;
