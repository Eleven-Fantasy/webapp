"use client";

import MatchHeader from "@/components/MatchHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState, useEffect } from "react";

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

    // Load selections from localStorage and listen for updates
    useEffect(() => {
        if (!match?.externalMatchId) return;

        const storageKey = `match-selections-${match.externalMatchId}`;

        // Default empty player structure
        const getDefaultPlayer = () => ({
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        });

        const getDefaultState = () => ({
            a: getDefaultPlayer(),
            b: getDefaultPlayer(),
            c: getDefaultPlayer(),
            d: getDefaultPlayer(),
            e: getDefaultPlayer(),
            f: getDefaultPlayer(),
            g: getDefaultPlayer(),
            h: getDefaultPlayer(),
            i: getDefaultPlayer(),
            j: getDefaultPlayer(),
            k: getDefaultPlayer(),
        });

        const loadSelections = () => {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Merge saved data with default state to ensure all positions exist
                    const merged = {
                        ...getDefaultState(),
                        ...parsed,
                    };
                    setSelectedPlayers(merged);
                } catch (e) {
                    console.error("Failed to parse saved selections", e);
                }
            }
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === storageKey && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    // Merge saved data with default state to ensure all positions exist
                    const merged = {
                        ...getDefaultState(),
                        ...parsed,
                    };
                    setSelectedPlayers(merged);
                } catch (e) {
                    console.error("Failed to parse saved selections", e);
                }
            }
        };

        const handleFocus = () => {
            loadSelections();
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                loadSelections();
            }
        };

        // Load on mount and when matchId changes
        loadSelections();

        // Listen for updates
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("focus", handleFocus);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("focus", handleFocus);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [match?.externalMatchId]);

    const [selectedPlayers, setSelectedPlayers] = useState({
        a: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        b: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        c: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        d: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        e: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        f: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        g: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        h: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        i: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        j: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
        k: {
            id: "",
            name: "",
            jersey: "",
            position: "",
            rating: 0,
            form: 0,
            teamName: "",
            isHome: false,
            headshot: "",
        },
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
                        Select 11 players
                    </p>

                    <div className="rounded-md overflow-hidden relative">
                        <div className="w-full h-full absolute top-0 left-0 z-[2] flex flex-col justify-between py-15 px-8">
                            <div className="w-full h-[10px] flex items-center justify-center">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.a?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.a.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.a?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            // Use database ID (match.id) for URL navigation, externalMatchId for localStorage
                                            const dbId = String(match.id); // Ensure it's a string
                                            router.push(
                                                `/select-player?id=${dbId}&externalId=${match.externalMatchId}&position=a`
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-between">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.b?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.b.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.b?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=b`
                                            )
                                        }
                                    />
                                </div>

                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.c?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.c.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.c?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=c`
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.d?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.d.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.d?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=d`
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.e?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.e.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.e?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=e`
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="w-full h-[10px] flex items-center justify-around">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.f?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.f.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.f?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=f`
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.g?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.g.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.g?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=g`
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.h?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.h.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.h?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=h`
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[10px] flex items-center justify-around">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.i?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.i.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.i?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=i`
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.j?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.j.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.j?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=j`
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="w-full h-[10px] flex items-center justify-around">
                                <div className="relative flex flex-col items-center">
                                    {selectedPlayers.k?.name && (
                                        <p className="text-[10px] font-[500] text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center max-w-[60px] truncate">
                                            {selectedPlayers.k.name}
                                        </p>
                                    )}
                                    <Image
                                        src={
                                            selectedPlayers.k?.name !== ""
                                                ? "/images/black-jersey.webp"
                                                : "/images/plane-jersey.webp"
                                        }
                                        alt="player"
                                        width={58}
                                        height={58}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/select-player?id=${String(
                                                    match.id
                                                )}&externalId=${
                                                    match.externalMatchId
                                                }&position=k`
                                            )
                                        }
                                    />
                                </div>
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
                    Complete your selections
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
