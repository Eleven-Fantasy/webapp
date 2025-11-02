"use client";
import MainHeader from "@/components/MainHeader";
import MatchWeek from "@/components/MatchWeek";
import Tabs from "@/components/Tabs";
import React from "react";

const MatchesPage = () => {
    return (
        <div className="w-full h-full relative">
            <MainHeader />
            <div className="flex flex-col gap-5 px-[1rem]">
                <div className="matchweek-navigator-cont flex items-center gap-4 mx-auto w-[70%] justify-between">
                    <button aria-label="Previous Matchweek">
                        <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="29"
                                y="29"
                                width="29"
                                height="29"
                                rx="14.5"
                                transform="rotate(-180 29 29)"
                                fill="#F1EEF4"
                            />
                            <g clip-path="url(#clip0_61_245)">
                                <path
                                    d="M16 10.6L11.8 14.5L16 18.4"
                                    stroke="#070707"
                                    stroke-linecap="square"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_61_245">
                                    <rect
                                        width="9"
                                        height="9"
                                        fill="white"
                                        transform="translate(19 19) rotate(-180)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <div>
                        <p className="text-[17px] font-[700] leading-none">
                            Matchweek 9
                        </p>
                        <p className="text-[9px] font-[500]">
                            Fri 3 Oct - Sun 5 Oct
                        </p>
                    </div>
                    <button aria-label="Next Matchweek">
                        <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="29"
                                height="29"
                                rx="14.5"
                                fill="#F1EEF4"
                            />
                            <g clip-path="url(#clip0_61_248)">
                                <path
                                    d="M13 18.4L17.2 14.5L13 10.6"
                                    stroke="#070707"
                                    stroke-linecap="square"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_61_248">
                                    <rect
                                        width="9"
                                        height="9"
                                        fill="white"
                                        transform="translate(10 10)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>

                <MatchWeek />
            </div>
            <Tabs />
        </div>
    );
};

export default MatchesPage;
