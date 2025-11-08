"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signIn("google", {
                callbackUrl: "/home",
                redirect: true,
            });
        } catch (error) {
            console.error("Sign in error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-[2rem] bg-gradient-to-b from-white via-accent/10 to-accent/20">
            <div className="flex flex-col items-center gap-8 w-full max-w-[400px]">
                {/* Logo and Title */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-end justify-center">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={60}
                            height={60}
                        />
                        <div className="flex flex-col justify-center items-start text-tetiary">
                            <p className="text-[24px] font-[800] leading-none">
                                Eleven
                            </p>
                            <p className="text-[14px] font-[800] leading-none">
                                Fantasy
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-[28px] font-[800] text-secondary mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-[14px] font-[500] text-gray-600">
                            Sign in to continue your fantasy journey
                        </p>
                    </div>
                </div>

                {/* Sign In Card */}
                <div className="w-full bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-lg">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-full px-6 py-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-tetiary rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1.38 12 1.38c-4.3 0-8.01 2.47-9.82 5.69l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span className="text-[15px] font-[600] text-gray-700">
                                    Continue with Google
                                </span>
                            </>
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-[12px] font-[400] text-gray-500">
                            By signing in, you agree to our Terms of Service
                            and Privacy Policy
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="w-full grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/50 rounded-[1rem] p-4 text-center border border-gray-100">
                        <Image
                            src="/images/trophy.webp"
                            alt="trophy"
                            width={24}
                            height={24}
                            className="mx-auto mb-2"
                        />
                        <p className="text-[11px] font-[600] text-gray-700">
                            Earn Points
                        </p>
                    </div>
                    <div className="bg-white/50 rounded-[1rem] p-4 text-center border border-gray-100">
                        <Image
                            src="/images/trophy.webp"
                            alt="trophy"
                            width={24}
                            height={24}
                            className="mx-auto mb-2"
                        />
                        <p className="text-[11px] font-[600] text-gray-700">
                            Compete
                        </p>
                    </div>
                    <div className="bg-white/50 rounded-[1rem] p-4 text-center border border-gray-100">
                        <Image
                            src="/images/trophy.webp"
                            alt="trophy"
                            width={24}
                            height={24}
                            className="mx-auto mb-2"
                        />
                        <p className="text-[11px] font-[600] text-gray-700">
                            Win Rewards
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;

