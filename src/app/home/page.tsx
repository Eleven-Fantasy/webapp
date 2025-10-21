"use client";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import React from "react";

const HomePage = () => {
    return (
        <div className="w-full h-screen relative">
            <MainHeader />
            <div></div>
            <Tabs />
        </div>
    );
};

export default HomePage;
