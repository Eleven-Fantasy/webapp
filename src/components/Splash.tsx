import Image from "next/image";
import React from "react";

const Splash = () => {
    return (
        <div className="w-screen h-screen bg-accent flex items-center justify-center">
            <div>
                <Image alt="" src="/images/logo.svg" width={204} height={207} />

                <div className="flex flex-col items-center text-center">
                    <p>Eleven</p>
                    <p>Fantasy</p>
                </div>
            </div>
        </div>
    );
};

export default Splash;
