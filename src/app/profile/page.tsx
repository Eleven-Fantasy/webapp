"use client";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
    return (
        <div className="w-full h-full pb-[4rem]">
            <MainHeader />
            <div className="flex flex-col gap-5 pb-[4rem]">
                <div className="w-full bg-accent bg-gradient-to-b from-white via-bg to-transparent min-h-[120px] p-[1rem] relative">
                    <Image
                        src="/images/avatar.webp"
                        alt="profile"
                        width={100}
                        height={100}
                        className="size-[90px] rounded-full absolute bottom-[-40px]"
                    />
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default ProfilePage;
