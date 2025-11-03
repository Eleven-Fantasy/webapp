"use client";
import React from "react";
import PointsBalance from "./PointsBalance";
import { useRouter } from "next/navigation";

const LeaderboardHeader = () => {
    const router = useRouter();
    return (
        <div className="w-full px-[24px] py-5 flex flex-col gap-2">
            <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => router.back()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>

                <p className="text-[19px] font-[700] leading-none">
                    Leaderboard
                </p>
            </div>

            <p className="text-[15px] font-[400] leading-none text-[#908294] w-[80%]">
                Compare your points with others and see where you stand.
            </p>
        </div>
    );
};

export default LeaderboardHeader;
