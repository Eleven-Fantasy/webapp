import React from "react";

const Primary = ({ onStartPlaying }: { onStartPlaying: () => void }) => {
    return (
        <div className="w-screen h-screen bg-[url('/images/pilot.webp')] bg-cover bg-center">
            <div className="w-full h-full bg-black/10 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end">
                <div className="content p-[20px] pb-[50px] flex flex-col gap-5 items-center justify-center">
                    <p className="text-white text-[47px] font-[700] text-center leading-none">
                        Play and earn rewards
                    </p>
                    <button
                        onClick={onStartPlaying}
                        className="w-full h-[56px] border border-white rounded-[10px] text-white text-[17px] font-[500]"
                    >
                        Start Playing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Primary;
