"use client";
import HeroCard from "@/components/HeroCard";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import UpcomingMatches from "@/components/UpcomingMatches";
import Image from "next/image";
import React from "react";

const HomePage = () => {
    return (
        <div className="w-full h-full relative">
            <MainHeader />
            <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-5 px-[1rem]">
                    <HeroCard />
                    <UpcomingMatches />
                </div>
                <Image
                    src="/images/potw.webp"
                    className="w-full"
                    alt="banner"
                    width={1000}
                    height={1000}
                />
            </div>
            <Tabs />
        </div>
    );
};

export default HomePage;
