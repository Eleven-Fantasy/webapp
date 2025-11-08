"use client";
import PlayerHeader from "@/components/PlayerHeader";
import { useSearchParams } from "next/navigation";
import React from "react";

const SelectPlayerPage = () => {
    const searchParams = useSearchParams();
    const matchId = searchParams.get("id");
    return (
        <div className="w-full h-full relative pb-[4rem]">
            <PlayerHeader />
            <div className="flex flex-col gap-5 px-[1rem] pb-[10rem]"></div>
        </div>
    );
};

export default SelectPlayerPage;
