import MatchHeader from "@/components/MatchHeader";
import Image from "next/image";
import React from "react";

const MatchDetailsPage = () => {
    return (
        <div className="w-full h-full relative">
            <MatchHeader />
            <div className="flex flex-col gap-5 px-[1rem]">
                <div
                    id="Fixture"
                    className="flex justify-between items-center gap-5 py-[2rem] px-[3rem]"
                >
                    <div className="flex flex-col items-center flex-1">
                        <Image
                            src="/images/team-logo/forest.png"
                            alt="home logo"
                            width={50}
                            height={50}
                        />
                        <p className="text-[13px]  font-[500]">
                            Nott&apos;m Forest
                        </p>
                    </div>
                    <p className="text-[18px] w-[2rem] font-[700]">12:30</p>
                    <div className="flex flex-col items-center flex-1 flex justify-end">
                        <Image
                            src="/images/team-logo/chelsea.png"
                            alt="home logo"
                            width={50}
                            height={50}
                        />
                        <p className="text-[13px] font-[500]">Chelsea</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-[1rem]">
                    <p className="text-[18px] font-[700] text-center">
                        From your starting XI
                    </p>

                    <div className="rounded-md overflow-hidden">
                        <Image
                            src="/images/pitch.webp"
                            alt="pitch"
                            width={584}
                            className="w-full scale-y-[1.1]"
                            height={386}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailsPage;
