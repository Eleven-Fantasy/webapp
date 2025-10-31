import Image from "next/image";
import React from "react";

const MATCHES = [
    {
        home: "Nott'm Forest",
        away: "Chelsea",
        homeLogo: "/images/team-logo/forest.png",
        awayLogo: "/images/team-logo/chelsea.png",
        time: "12:30",
    },
    {
        home: "Nott'm Forest",
        away: "Chelsea",
        homeLogo: "/images/team-logo/forest.png",
        awayLogo: "/images/team-logo/chelsea.png",
        time: "12:30",
    },
    {
        home: "Nott'm Forest",
        away: "Chelsea",
        homeLogo: "/images/team-logo/forest.png",
        awayLogo: "/images/team-logo/chelsea.png",
        time: "12:30",
    },
    {
        home: "Nott'm Forest",
        away: "Chelsea",
        homeLogo: "/images/team-logo/forest.png",
        awayLogo: "/images/team-logo/chelsea.png",
        time: "12:30",
    },
];

const UpcomingMatches = () => {
    return (
        <div className="flex flex-col gap-[1rem]">
            <p className="text-[19px] font-[800]">Upcoming Matches</p>
            <div className="content w-full p-[1rem] rounded-[5px] shadow-lg shadow-black/5 flex flex-col gap-2">
                <p className="text-[11px] font-[500]">🔥 Hot</p>
                <div className="matches flex flex-col gap-5">
                    {MATCHES.map((match, index) => (
                        <div>
                            <div
                                key={index}
                                className="match flex gap-[0.5rem] items-center justify-center text-[11px] font-[500] font-satoshi"
                            >
                                <div className="flex-[1] flex justify-end items-center gap-1">
                                    <p>{match.home}</p>
                                    <Image
                                        width={20}
                                        height={20}
                                        src={match.homeLogo}
                                        alt="home logo"
                                    />
                                </div>
                                <p className="w-[2rem] text-center text-[10px] font-[700]">
                                    {match.time}
                                </p>
                                <div className="flex-[1] flex items-center justify-start gap-1">
                                    <Image
                                        width={20}
                                        height={20}
                                        src={match.awayLogo}
                                        alt="home logo"
                                    />

                                    <p>{match.away}</p>
                                </div>
                            </div>
                            <div className="w-[70%] mx-auto mt-4 border-b border-secondary/10"></div>
                        </div>
                    ))}
                </div>
                <button className="rounded-full bg-accent px-[1rem] self-center py-[0.5rem] text-[9px] text-white font-[500]">
                    Select Matches
                </button>
            </div>
        </div>
    );
};

export default UpcomingMatches;
