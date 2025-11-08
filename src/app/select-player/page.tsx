"use client";
import PlayerHeader from "@/components/PlayerHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";

interface Player {
    id: string;
    displayName: string;
    jersey: string;
    position: {
        displayName: string;
        abbreviation: string;
    };
    rating: number;
    form: number;
    teamName: string;
    isHome: boolean;
    headshot: string;
}

interface PlayersResponse {
    players: Player[];
    homeTeam: string;
    awayTeam: string;
}

const fetchPlayers = async (matchId: string): Promise<PlayersResponse> => {
    const response = await axios.get<PlayersResponse>(
        `/api/match/${matchId}/players`
    );
    return response.data;
};

const SelectPlayerContent = () => {
    const searchParams = useSearchParams();
    const matchId = searchParams.get("id");

    const {
        data: playersData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["players", matchId],
        queryFn: () => fetchPlayers(matchId!),
        enabled: !!matchId,
    });

    if (isLoading) {
        return (
            <div className="w-full h-full pb-[4rem]">
                <PlayerHeader />
                <div className="flex justify-center items-center h-[50vh]">
                    <p className="text-[14px] text-gray-500">
                        Loading players...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !playersData) {
        return (
            <div className="w-full h-full pb-[4rem]">
                <PlayerHeader />
                <div className="flex justify-center items-center h-[50vh]">
                    <p className="text-[14px] text-red-500">
                        {error instanceof Error
                            ? error.message
                            : "Failed to load players"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full pb-[4rem]">
            <PlayerHeader />
            <div className="flex flex-col gap-5 px-[1rem] pb-[10rem] overflow-y-auto">
                <div className="mb-4">
                    <p className="text-[14px] text-gray-600">
                        {playersData.homeTeam} vs {playersData.awayTeam}
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="text-[#340143] table-auto w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-200">
                                <th className="py-3 px-2">Photo</th>
                                <th className="py-3 px-2">Player</th>
                                <th className="py-3 px-2">Rating</th>
                                <th className="py-3 px-2">Form</th>
                                <th className="py-3 px-2">Number</th>
                                <th className="py-3 px-2">Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersData.players.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-4 text-center text-gray-500"
                                    >
                                        No players found
                                    </td>
                                </tr>
                            ) : (
                                playersData.players.map((player) => {
                                    // Get initials for avatar fallback
                                    const nameParts =
                                        player.displayName.split(" ");
                                    const initials = nameParts
                                        .map((part) => part[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2);

                                    return (
                                        <PlayerRow
                                            key={player.id}
                                            player={player}
                                            initials={initials}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Component for player row with avatar state
const PlayerRow = ({
    player,
    initials,
}: {
    player: Player;
    initials: string;
}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {!imageError ? (
                        <img
                            src={player.headshot}
                            alt={player.displayName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[11px] font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-full">
                            {initials}
                        </div>
                    )}
                </div>
            </td>
            <td className="py-3 px-2 font-medium">
                <div className="flex flex-col">
                    <span>{player.displayName}</span>
                    <span
                        className={`text-[10px] ${
                            player.isHome ? "text-blue-600" : "text-red-600"
                        }`}
                    >
                        {player.teamName}
                    </span>
                </div>
            </td>
            <td className="py-3 px-2">{player.rating}</td>
            <td className="py-3 px-2">{player.form}</td>
            <td className="py-3 px-2">{player.jersey || "-"}</td>
            <td className="py-3 px-2">
                {player.position.abbreviation || player.position.displayName}
            </td>
        </tr>
    );
};

const SelectPlayerPage = () => {
    return (
        <Suspense
            fallback={<div className="w-full h-full pb-[4rem]">Loading...</div>}
        >
            <SelectPlayerContent />
        </Suspense>
    );
};

export default SelectPlayerPage;
