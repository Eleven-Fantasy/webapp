import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const tabs = [
    {
        id: 1,
        title: "Home",
        icon: "/images/tabs/home.svg",
        activeIcon: "/images/tabs/activeHome.svg",
        path: "/home",
    },
    {
        id: 2,
        title: "Matches",
        icon: "/images/tabs/matches.svg",
        activeIcon: "/images/tabs/activeMatches.svg",
        path: "/matches",
    },
    {
        id: 3,
        title: "Leaderboard",
        icon: "/images/tabs/leaderboard.svg",
        activeIcon: "/images/tabs/activeLeaderboard.svg",
        path: "/leaderboard",
    },
    {
        id: 4,
        title: "Profile",
        icon: "/images/tabs/profile.svg",
        activeIcon: "/images/tabs/activeProfile.svg",
        path: "/profile",
    },
];

const Tabs = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    const router = useRouter();
    const handleTabClick = (path: string) => {
        router.push(path);
    };
    return (
        <div className="w-full h-[86px] bg-white absolute bottom-0 left-0">
            <div className="inner w-full h-full flex gap-2 justify-between items-center px-[1rem]">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => handleTabClick(tab.path)}
                        className={`flex pt-2 flex-col items-center justify-center  border-t-2 ${
                            isActive(tab.path)
                                ? "border-tetiary"
                                : "border-transparent"
                        }`}
                    >
                        <Image
                            src={isActive(tab.path) ? tab.activeIcon : tab.icon}
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
