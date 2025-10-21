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
        <div className="w-screen h-screen overflow-hidden">
            <div
                className="flex w-[200vw] h-full transition-transform duration-500 ease-in-out"
                style={{
                    transform: hasStarted
                        ? "translateX(-100vw)"
                        : isLoading
                        ? "translateX(0)"
                        : "translateX(-100vw)",
                }}
            >
                {/* Splash Screen */}
                <div className="w-screen h-screen flex-shrink-0">
                    <Splash />
                </div>

                {/* Primary Screen */}
                <div className="w-screen h-screen flex-shrink-0">
                    <Primary onStartPlaying={handleStartPlaying} />
                </div>
            </div>
        </div>
    );
}
