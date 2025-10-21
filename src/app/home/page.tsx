"use client";
import HeroCard from "@/components/HeroCard";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import React from "react";

const HomePage = () => {
    return (
        <div className="w-full h-full relative">
            <MainHeader />
            <div className="flex flex-col gap-5 px-[24px]">
                <HeroCard />
            </div>
            <Tabs />
        </div>
    );
};

export default HomePage;
