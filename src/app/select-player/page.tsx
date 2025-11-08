"use client";
import PlayerHeader from "@/components/PlayerHeader";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SelectPlayerContent = () => {
    const searchParams = useSearchParams();
    const matchId = searchParams.get("id");
    return (
        <div className="w-full h-full pb-[4rem]">
            <PlayerHeader />
            <div className="flex flex-col gap-5 px-[1rem] pb-[10rem] oveflow-y-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Rating</th>
                            <th>Form</th>
                            <th>Number</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Player</td>
                            <td>Rating</td>
                            <td>Form</td>
                            <td>Number</td>
                            <td>Position</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
