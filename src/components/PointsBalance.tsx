import Image from "next/image";
import React from "react";

const PointsBalance = () => {
    return (
        <div className="py-2 px-3 rounded-full bg-[#F5F5F5] flex gap-2 items-center">
            <Image
                src="/images/trophy.webp"
                alt="points balance"
                width={18}
                height={18}
            />
            <p className="text-[13px] font-[500] text-[#000]">567,846 pts</p>
        </div>
    );
};
export default PointsBalance;
