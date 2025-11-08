"use client";
import Splash from "@/components/Splash";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            // Always redirect to home page after splash, regardless of auth status
            router.push("/home");
        }, 3000);
    }, [router]);

    return (
        <div className="w-full h-full overflow-hidden">
            <div className={`flex w-[200vw] lg:w-[900px] h-full`}>
                <div className="w-screen lg:w-[450px] h-full flex-shrink-0">
                    <Splash />
                </div>
            </div>
        </div>
    );
}
