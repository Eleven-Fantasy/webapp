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

                <div className="flex flex-col gap-2">
                    <p className="text-[17px] font-[700] leading-none">
                        Your Position
                    </p>
                    <div className="w-full py-[12px] px-[24px] rounded-[1rem] border border-accent flex gap-4 items-center justify-between bg-[#E7E7E7]">
                        <Image
                            src="/images/pfp/profile.webp"
                            alt="team logo"
                            width={41}
                            height={41}
                        />
                        <div className="flex-[1] flex flex-col gap-1">
                            <p className="text-[16px] font-[700] leading-none">
                                0x6y..896
                            </p>
                            <p className="text-[12px] font-[400] leading-none">
                                67,000P
                            </p>
                        </div>
                        <p className="text-[15px] font-[700] leading-none">
                            #18
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[17px] font-[700] leading-none">
                        Community Leaderboard
                    </p>
                    <div className="w-full py-[12px] px-[24px] rounded-[1rem] border border-accent flex gap-4 items-center justify-between bg-[#E7E7E7]">
                        <Image
                            src="/images/pfp/profile.webp"
                            alt="team logo"
                            width={41}
                            height={41}
                        />
                        <div className="flex-[1] flex flex-col gap-1">
                            <p className="text-[16px] font-[700] leading-none">
                                0x6y..896
                            </p>
                            <p className="text-[12px] font-[400] leading-none">
                                67,000P
                            </p>
                        </div>
                        <p className="text-[15px] font-[700] leading-none">
                            #1
                        </p>
                    </div>
                    <div className="w-full py-[12px] px-[24px] rounded-[1rem] border border-accent flex gap-4 items-center justify-between bg-[#E7E7E7]">
                        <Image
                            src="/images/pfp/profile.webp"
                            alt="team logo"
                            width={41}
                            height={41}
                        />
                        <div className="flex-[1] flex flex-col gap-1">
                            <p className="text-[16px] font-[700] leading-none">
                                0x6y..896
                            </p>
                            <p className="text-[12px] font-[400] leading-none">
                                67,000P
                            </p>
                        </div>
                        <p className="text-[15px] font-[700] leading-none">
                            #2
                        </p>
                    </div>
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default LeaderboardPage;
