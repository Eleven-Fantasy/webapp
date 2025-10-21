import Image from "next/image";
import React from "react";

const Splash = () => {
    return (
        <div className="w-screen h-screen bg-accent flex items-center justify-center">
            <div className=" mt-[-50px]">
                <Image alt="" src="/images/logo.svg" width={204} height={207} />
                <div className="flex flex-col items-center text-center font-[700] text-white transition-all duration-500 ease-out translate-y-12 opacity-0 animate-easeUp">
                    <p className="leading-none text-[55px]">Eleven</p>
                    <p className="text-[45px] leading-[21px]">Fantasy</p>
                </div>
                <style jsx global>{`
                    @keyframes easeUp {
                        from {
                            opacity: 0;
                            transform: translateY(48px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-easeUp {
                        animation: easeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)
                            forwards;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Splash;
