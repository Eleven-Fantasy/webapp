"use client";

import MatchHeader from "@/components/MatchHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";

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

    const router = useRouter();

    const {
        data: match,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["match", matchId],
        queryFn: () => fetchMatch(matchId!),
        enabled: !!matchId,
    });

    const [selectedPlayers, setSelectedPlayers] = useState({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
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
            <div className="flex flex-col gap-5 px-[1rem] pb-[10rem]">
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
                        <p className="text-[13px] font-[500] text-center">
                            {match.home}
                        </p>
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
                        <p className="text-[13px] font-[500] text-center">
                            {match.away}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-[1rem]">
                    <p className="text-[18px] font-[700] text-center">
                        Form your starting XI
                    </p>

                    <div className="rounded-md overflow-hidden relative">
                        <div className="w-full h-full absolute top-0 left-0 z-[2] flex flex-col justify-between py-10 px-8">
                            <div className="w-full h-[10px] flex items-center justify-center">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/select-player/?id=${match.id}`
                                        )
                                    }
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-between">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />

                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <Image
                                    src={"/images/plane-jersey.webp"}
                                    alt="player"
                                    width={58}
                                    height={58}
                                />
                            </div>
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
            <div className="fixed bottom-0 z-[5]  lg:w-[450px] lg:ml-[calc(50%-225px)] left-0 w-full bg-white flex justify-center items-center p-[1rem]">
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
