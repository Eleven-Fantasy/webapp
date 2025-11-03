"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

const fetchUpcomingMatches = async (): Promise<Match[]> => {
    const response = await axios.get<Match[]>("/api/upcoming-matches");
    return response.data;
};

const UpcomingMatches = () => {
    const router = useRouter();

    const {
        data,
        isLoading: loading,
        error,
    } = useQuery({
        queryKey: ["upcoming-matches"],
        queryFn: fetchUpcomingMatches,
    });

    const matches = data ? data.slice(0, 5) : [];

    return (
        <div className="flex flex-col gap-[1rem]">
            <p className="text-[19px] font-[800]">Upcoming Matches</p>
            <div className="content w-full p-[1rem] rounded-[5px] shadow-lg shadow-black/5 flex flex-col gap-2">
                <p className="text-[11px] font-[500]">🔥 Hot</p>
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-[12px] text-gray-500">
                            Loading matches...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-[12px] text-red-500">
                            {error instanceof Error
                                ? error.message
                                : "An error occurred"}
                        </p>
                    </div>
                ) : matches.length === 0 ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-[12px] text-gray-500">
                            No upcoming matches
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="matches flex flex-col gap-5">
                            {matches.map((match) => (
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
                                                        // Fallback to default logo if image fails to load
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
                                                        // Fallback to default logo if image fails to load
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
                        <button
                            onClick={() => router.push("/matches")}
                            className="rounded-full bg-accent px-[1rem] self-center py-[0.5rem] text-[9px] text-white font-[500]"
                        >
                            Select Matches
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UpcomingMatches;
