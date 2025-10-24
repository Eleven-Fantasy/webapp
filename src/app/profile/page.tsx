"use client";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import React from "react";

const ProfilePage = () => {
    return (
        <div className="w-full h-full relative">
            <MainHeader />
            <div className="flex flex-col gap-5 px-[1rem]"></div>
            <Tabs />
        </div>
    );
};

export default ProfilePage;
