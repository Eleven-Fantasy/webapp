"use client";

import MatchHeader from "@/components/MatchHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

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

const fetchMatch = async (matchId: string): Promise<Match> => {
    const response = await axios.get<Match>(`/api/match/${matchId}`);
    return response.data;
};

const MatchDetailsContent = () => {
    const searchParams = useSearchParams();
    const matchId = searchParams.get("id");

    const {
        data: match,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["match", matchId],
        queryFn: () => fetchMatch(matchId!),
        enabled: !!matchId,
    });

    if (isLoading) {
        return (
            <div className="w-full h-full relative">
                <MatchHeader />
                <div className="flex justify-center items-center h-[50vh]">
                    <p className="text-[14px] text-gray-500">
                        Loading match...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !match) {
        return (
            <div className="w-full h-full relative">
                <MatchHeader />
                <div className="flex justify-center items-center h-[50vh]">
                    <p className="text-[14px] text-red-500">
                        {error instanceof Error
                            ? error.message
                            : "Match not found"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative pb-[4rem]">
            <MatchHeader />
            <div className="flex flex-col gap-5 px-[1rem]">
                <div
                    id="Fixture"
                    className="flex justify-between items-center gap-5 py-[2rem] px-[3rem]"
                >
                    <div className="flex flex-col items-center flex-1">
                        {match.homeLogo ? (
                            <Image
                                src={match.homeLogo}
                                alt={`${match.home} logo`}
                                width={50}
                                height={50}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/images/team-logo/forest.png";
                                }}
                            />
                        ) : (
                            <Image
                                src="/images/team-logo/forest.png"
                                alt="home logo"
                                width={50}
                                height={50}
                            />
                        )}
                        <p className="text-[13px] font-[500]">{match.home}</p>
                    </div>
                    <p className="text-[18px] w-[2rem] font-[700]">
                        {match.time}
                    </p>
                    <div className="flex flex-col items-center flex-1 flex justify-end">
                        {match.awayLogo ? (
                            <Image
                                src={match.awayLogo}
                                alt={`${match.away} logo`}
                                width={50}
                                height={50}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/images/team-logo/chelsea.png";
                                }}
                            />
                        ) : (
                            <Image
                                src="/images/team-logo/chelsea.png"
                                alt="away logo"
                                width={50}
                                height={50}
                            />
                        )}
                        <p className="text-[13px] font-[500]">{match.away}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-[1rem]">
                    <p className="text-[18px] font-[700] text-center">
                        From your starting XI
                    </p>

                    <div className="rounded-md overflow-hidden relative">
                        <div className="w-full h-full absolute top-0 left-0 z-[2] flex flex-col justify-between py-10">
                            <div className="w-full h-[10px] bg-[red]"></div>
                            <div className="w-full h-[10px] bg-[red]"></div>
                            <div className="w-full h-[10px] bg-[red]"></div>
                            <div className="w-full h-[10px] bg-[red]"></div>
                            <div className="w-full h-[10px] bg-[red]"></div>
                            <div className="w-full h-[10px] bg-[red]"></div>
                        </div>
                        <Image
                            src="/images/match-pitch.webp"
                            alt="pitch"
                            width={584}
                            className="w-full object-cover"
                            height={386}
                        />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0  lg:w-[450px] lg:ml-[calc(50%-225px)] left-0 w-full bg-white flex justify-center items-center p-[1rem]">
                <button className="py-[1rem] cursor-pointer w-full text-center text-[1rem] text-white bg-[#525153] px-[1.5rem] rounded-[0.7rem]">
                    Select 11 players
                </button>
            </div>
        </div>
    );
};

const MatchDetailsPage = () => {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full relative">
                    <MatchHeader />
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-[14px] text-gray-500">
                            Loading match...
                        </p>
                    </div>
                </div>
            }
        >
            <MatchDetailsContent />
        </Suspense>
    );
};

export default MatchDetailsPage;
