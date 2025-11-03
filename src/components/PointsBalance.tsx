import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

const PointsBalance = () => {
    const { data: points } = useQuery({
        queryKey: ["points"],
        queryFn: async () => {
            const response = await axios.get("/api/points");
            return response.data;
        },
    });
    return (
        <div className="py-2 px-3 rounded-full bg-[#F5F5F5] flex gap-2 items-center">
            <Image
                src="/images/trophy.webp"
                alt="points balance"
                width={18}
                height={18}
            />
            <p className="text-[13px] font-[500] text-[#000]">
                {(typeof points === "number" ? points : 0).toLocaleString()} pts
            </p>
        </div>
    );
};
export default PointsBalance;
