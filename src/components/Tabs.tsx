import Image from "next/image";
import React from "react";

const tabs = [
    {
        id: 1,
        title: "Home",
        icon: "/images/tabs/home.svg",
        activeIcon: "/images/tabs/activeHome.svg",
        path: "/",
    },
    {
        id: 2,
        title: "Matches",
        icon: "/images/tabs/matches.svg",
        activeIcon: "/images/tabs/activeMatches.svg",
        path: "/",
    },
    {
        id: 3,
        title: "Leaderboard",
        icon: "/images/tabs/leaderboard.svg",
        activeIcon: "/images/tabs/activeLeaderboard.svg",
        path: "/",
    },
    {
        id: 4,
        title: "Profile",
        icon: "/images/tabs/profile.svg",
        activeIcon: "/images/tabs/activeProfile.svg",
        path: "/",
    },
];

const Tabs = () => {
    return (
        <div className="w-full h-[86px] bg-white absolute bottom-0 left-0">
            <div className="inner w-full h-full flex gap-2 justify-between items-center px-[1rem]">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className="flex flex-col items-center justify-center"
                    >
                        <Image
                            src={tab.icon}
                            alt={tab.title}
                            width={24}
                            height={24}
                        />
                        <p className="text-sm font-medium">{tab.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
