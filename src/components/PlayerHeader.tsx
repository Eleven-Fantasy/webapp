"use client";
import React from "react";
import PointsBalance from "./PointsBalance";
import { useRouter } from "next/navigation";

const PlayerHeader = ({ match }: { match?: any }) => {
    const router = useRouter();
    return (
        <div className="w-full px-[24px] py-5 flex items-center justify-between">
            <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => router.push(`/match-details?id=${match.id}`)}
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
                    Add Players
                </p>
            </div>

            <PointsBalance />
        </div>
    );
};

export default PlayerHeader;
