"use client";
import LeaderboardHeader from "@/components/LeaderboardHeader";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import React from "react";

const LeaderboardPage = () => {
    return (
        <div className="w-full h-full relative">
            <LeaderboardHeader />
            <div className="flex flex-col gap-5 px-[1rem]">
                <div className="w-full p-[2rem] rounded-[1rem] bg-[#EFEFEF] flex flex-col justify-center items-center gap-2">
                    <Image
                        src="/images/trophy-large.webp"
                        alt="leaderboard"
                        width={100}
                        height={100}
                        className="size-[92px]"
                    />
                    <p className="text-[27px] font-[700] leading-none text-[#333333]">
                        67,000
                    </p>
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default LeaderboardPage;
