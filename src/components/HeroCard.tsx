import Image from "next/image";
import React from "react";

const HeroCard = () => {
    return (
        <div className="bg-[url('/images/gradient.webp')] bg-cover bg-center px-2 py-2 rounded-[1rem] flex flex-col items-center text-center gap-2">
            <div className="flex items-end justify-center pr-4">
                <Image
                    src="/images/logo.svg"
                    alt="hero card"
                    width={45}
                    height={45}
                />
                <div className="flex flex-col justify-center text-white">
                    <p className="text-[18px] font-[800] leading-none">
                        Eleven
                    </p>
                    <p className="text-[12px] font-[800] leading-none">
                        Fantasy
                    </p>
                </div>
            </div>
            <p className="text-white font-[800] text-[45px] text-center leading-none">
                Fantasy
            </p>
            <p className="text-white w-[80%] lg:w-[60%] font-[700] text-[8px] text-center">
                Welcome to the eleven fantasy football game play, compete, and
                earn real rewards instantly, starting with football.
            </p>
            <button className="w-[45%] h-[30px] bg-black/4 text-primary font-[700] text-[12px] rounded-full">
                Get Started
            </button>
        </div>
    );
};

export default HeroCard;
