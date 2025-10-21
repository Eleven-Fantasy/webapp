import Image from "next/image";
import React from "react";
import PointsBalance from "./PointsBalance";

const MainHeader = () => {
    return (
        <div className="w-full px-[24px] py-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src="/images/logo-black.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
                <p className="text-[13px] font-[800]">eleven</p>
            </div>

            <PointsBalance />
        </div>
    );
};

export default MainHeader;
