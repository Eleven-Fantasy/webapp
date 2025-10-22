import React from "react";

const UpcomingMatches = () => {
    return (
        <div className="flex flex-col gap-[1rem]">
            <p className="text-[19px] font-[800]">Upcoming Matches</p>
            <div className="content w-full p-[1rem] rounded-[5px] shadow-lg shadow-black/5 flex flex-col gap-2">
                <p className="text-[11px] font-[500]">🔥 Hot</p>
                <div className="matches"></div>
                <button className="rounded-full bg-accent px-[1rem] self-center py-[0.5rem] text-[9px] text-white font-[500]">
                    Select Matches
                </button>
            </div>
        </div>
    );
};

export default UpcomingMatches;
