"use client";
import Primary from "@/components/Primary";
import Splash from "@/components/Splash";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    ///state.........................
    const [isLoading, setIsLoading] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    ///functions.........................
    const handleStartPlaying = useCallback(() => {
        setHasStarted(true);
    }, []);

    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    if (hasStarted) {
        router.push("/home");
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <div
                className={`flex w-[200vw] lg:w-[900px] h-full transition-transform duration-500 ease-in-out ${
                    hasStarted
                        ? "translate-x-[-100vw] lg:translate-x-[-450px]"
                        : isLoading
                        ? "translate-x-0"
                        : "translate-x-[-100vw] lg:translate-x-[-450px]"
                }`}
            >
                {/* Splash Screen */}
                <div className="w-screen lg:w-[450px] h-full flex-shrink-0">
                    <Splash />
                </div>

                {/* Primary full */}
                <div className="w-screen lg:w-[450px] h-full flex-shrink-0">
                    <Primary onStartPlaying={handleStartPlaying} />
                </div>
            </div>
        </div>
    );
}
